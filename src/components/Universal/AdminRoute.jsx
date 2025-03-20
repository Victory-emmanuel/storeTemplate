// src/components/AdminRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@material-tailwind/react"; // Use Material Tailwind Spinner

// Replace this with your actual admin check logic
function isAdmin(user) {
  // For example, you might check user.customClaims or a specific admin list.
  // Here, we simply check if the user's email matches an approved admin email.
  const adminEmails = ["marketinglot.blog@gmail.com"];
  return user && adminEmails.includes(user.email);
}

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
        <Spinner className="h-12 w-12" color="pink" />
      </div>
    );

  // If user is not logged in or is not an admin, redirect to admin login.
  if (!user || !isAdmin(user)) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
