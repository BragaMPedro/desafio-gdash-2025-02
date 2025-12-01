package main

import (
	"bytes"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

const (
	queueName        = "weather_queue"
	retryCount       = 5
	retryInterval    = 5 * time.Second
	backendEndpoint  = "/api/weather"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func main() {
	amqpURL := os.Getenv("AMQP_URL")
	if amqpURL == "" {
		amqpURL = "amqp://rabbitmq:5672/"
		log.Println("AMQP_URL not set, using default")
	}

	backendAPIURL := os.Getenv("BACKEND_API_URL")
	if backendAPIURL == "" {
		backendAPIURL = "http://localhost:3000"
		log.Println("BACKEND_API_URL not set, using default")
	}
	
	apiEndpoint := backendAPIURL + backendEndpoint

	var conn *amqp091.Connection
	var err error
	for i := 0; i < retryCount; i++ {
		conn, err = amqp091.Dial(amqpURL)
		if err == nil {
			break
		}
		log.Printf("Failed to connect to RabbitMQ, retrying in %s...", retryInterval)
		time.Sleep(retryInterval)
	}
	failOnError(err, "Failed to connect to RabbitMQ after retries")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		queueName, // name
		true,      // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	log.Printf(" [*] Waiting for messages on queue '%s'. To exit press CTRL+C", queueName)

	var forever chan struct{}

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)

			// Send to backend API
			req, err := http.NewRequest("POST", apiEndpoint, bytes.NewBuffer(d.Body))
			if err != nil {
				log.Printf("Error creating request: %s. Nacking message.", err)
				d.Nack(false, true) // Requeue the message
				continue
			}
			req.Header.Set("Content-Type", "application/json")

			client := &http.Client{Timeout: 10 * time.Second}
			resp, err := client.Do(req)
			if err != nil {
				log.Printf("Error sending to backend: %s. Nacking message.", err)
				d.Nack(false, true) // Requeue the message
				continue
			}
			defer resp.Body.Close()

			if resp.StatusCode >= 200 && resp.StatusCode < 300 {
				log.Printf("Successfully sent to backend, status: %s", resp.Status)
				d.Ack(false) // Acknowledge the message
			} else {
				log.Printf("Backend returned non-success status: %s. Nacking message.", resp.Status)
				d.Nack(false, true) // Requeue the message
			}
		}
	}()

	<-forever
}
