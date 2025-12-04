import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="font-bold">GDASH</div>
        <nav className="flex gap-4">
          <a href="/" className="text-sm hover:underline">Dashboard</a>
          <a href="/users" className="text-sm hover:underline">Usuários</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}