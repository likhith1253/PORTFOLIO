"use client"
import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

const skills = [
  { name: "HTML & CSS", level: 90, icon: "🌐" },
  { name: "JavaScript", level: 85, icon: "📜" },
  { name: "React", level: 80, icon: "⚛️" },
  { name: "Node.js", level: 75, icon: "🟢" },
  { name: "UI/UX Design", level: 70, icon: "🎨" },
]

export default function SkillsTimeline() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex space-x-8 py-8 px-4 overflow-x-auto snap-x"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex-shrink-0 w-64 snap-center">
              <div className="bg-card rounded-lg shadow-lg p-6 h-full border border-border hover:border-primary transition-colors duration-300">
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground">{skill.level}% Proficiency</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="mt-12 relative">
        <div className="absolute left-0 right-0 h-1 bg-muted top-1/2 transform -translate-y-1/2"></div>
        <motion.div
          className="flex justify-between relative"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="w-4 h-4 rounded-full bg-primary mb-2"></div>
              <p className="text-sm font-medium text-center">{skill.name}</p>
              <p className="text-xs text-muted-foreground">{2018 + index}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

