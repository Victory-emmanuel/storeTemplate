// src/pages/Admin/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input, Button, Card } from "@material-tailwind/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 dark:bg-black dark:text-white bg-primary text-secondary px-4">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:max-w-2xl h-full lg:max-h-[40rem]"
      >
        <Card className="p-8 shadow-lg rounded-xl bg-white dark:bg-secondary">
          {/* Header */}
          <h2 className="text-3xl dark:text-primary text-secondary font-bold text-center mb-6">
            Admin Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-medium dark:text-white text-black"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Admin's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-medium dark:text-white text-black"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black dark:text-white"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block"
                >
                  🔄
                </motion.span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
