"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ProfileSection() {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl">
        <Image
          src="/placeholder.svg?height=320&width=320"
          alt="Profile Picture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-white font-medium">John Doe</span>
        </div>
      </div>
    </motion.div>
  )
}

