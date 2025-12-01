# Stage 1: Build the Go binary
FROM golang:1.22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY src/ .

# Build the Go app
# CGO_ENABLED=0 is important for creating a static binary that can run in a minimal image
# -o /go/bin/app creates the output binary in a specific location
RUN CGO_ENABLED=0 GOOS=linux go build -o /go/bin/app .

# Stage 2: Create the final, minimal image
FROM alpine:latest

# Copy the built binary from the builder stage
COPY --from=builder /go/bin/app /app

EXPOSE 8080

# Set the command to run the executable
CMD ["/app"]
