"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10"></div>
  }

  return (
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 relative overflow-hidden"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>
      </Button>
    </motion.div>
  )
}

