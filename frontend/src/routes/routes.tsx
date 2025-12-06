import Layout from "@/components/Layout";
import { PrivateRoute } from "@/components/PrivateRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function AppRouter() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <Routes>
               <Route path="/login" element={<LoginPage />} />

               <Route element={<PrivateRoute />}>
                  <Route element={<Layout />}>
                     <Route path="/" element={<Dashboard />} />
                     {/* <Route path="/users" element={<Dashboard />} /> */}
                  </Route>
               </Route>

               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </AuthProvider>
      </BrowserRouter>
   );
}
