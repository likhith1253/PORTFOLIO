"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Check, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DownloadCVButton() {
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "complete">("idle")

  const handleDownload = () => {
    setDownloadState("downloading")

    // Simulate download delay
    setTimeout(() => {
      setDownloadState("complete")

      // Reset after showing completion
      setTimeout(() => {
        setDownloadState("idle")

        // Trigger actual download
        const link = document.createElement("a")
        link.href = "/path-to-your-cv.pdf" // Replace with actual CV path
        link.download = "John-Doe-CV.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 1500)
    }, 2000)
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        size="lg"
        className="px-8 py-6 text-lg relative overflow-hidden group"
        onClick={handleDownload}
        disabled={downloadState !== "idle"}
      >
        <AnimatePresence mode="wait">
          {downloadState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </motion.div>
          )}

          {downloadState === "downloading" && (
            <motion.div
              key="downloading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Downloading...
            </motion.div>
          )}

          {downloadState === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center text-green-500"
            >
              <Check className="mr-2 h-5 w-5" />
              Downloaded!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-primary/20 -z-10"
          initial={{ x: "-100%" }}
          animate={{
            x: downloadState === "downloading" ? "0%" : "-100%",
          }}
          transition={{ duration: 2 }}
        />
      </Button>
    </motion.div>
  )
}

