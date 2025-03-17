// src/components/AdminRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@material-tailwind/react"; // Use Material Tailwind Spinner

export default function AdminRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12" color="pink" />{" "}
        {/* Material Tailwind Spinner */}
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
