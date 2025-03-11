"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function IntroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-6"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Hello, I'm <span className="text-primary">John Doe</span>
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Frontend Developer
      </motion.h2>

      <motion.p
        className="text-lg text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        I create beautiful, responsive websites with modern technologies. Passionate about user experience and clean
        code.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Button size="lg">Contact Me</Button>
        <Button size="lg" variant="outline">
          View Projects
        </Button>
      </motion.div>
    </motion.div>
  )
}

