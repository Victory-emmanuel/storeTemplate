import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden mb-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.postimg.cc/kg5Tsst7/11192.jpg"
          alt="Background "
          className="w-full h-full object-cover object-center brightness-[0.85] dark:brightness-[0.6]"
        />
      </div>

      <div className="relative z-10  mx-auto px-6 ss:px-12 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              color="white"
              className="font-bold text-7xl md:text-8xl lg:text-9xl mb-4"
            >
              Shop
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="lead" color="white" className="mb-8 max-w-lg">
              Satisfy your Carvings
            </Typography>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
