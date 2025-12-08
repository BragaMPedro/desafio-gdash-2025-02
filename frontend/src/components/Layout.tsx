import { AuthContext } from "@/contexts/AuthContext";
import { LogOutIcon } from "lucide-react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export default function Layout() {
    const { logout } = useContext(AuthContext);

   return (
      <div className="min-h-screen bg-background">
         <header className="border-b p-4 flex justify-between items-center">
            <div className="font-bold">GDASH</div>
            <nav className="flex gap-4">
               <a href="/" className="text-sm hover:underline"> Dashboard </a>
               <a href="/users" className="text-sm hover:underline"> Usuários </a>
               <Button variant="outline" size="icon" aria-label="Logout" onClick={logout}>
                  <LogOutIcon />
               </Button>
            </nav>
         </header>
         <main>
            <Outlet />
         </main>
      </div>
   );
}
