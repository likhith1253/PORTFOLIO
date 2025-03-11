import { ModeToggle } from "../components/mode-toggle"
import IntroSection from "../components/intro-section"
import ProfileSection from "../components/profile-section"
import SkillsTimeline from "../components/skills-timeline"
import DownloadCVButton from "../components/download-cv-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">My Portfolio</h1>
        <ModeToggle />
      </header>

      <main className="container mx-auto px-4 py-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <IntroSection />
          <ProfileSection />
        </div>

        <section className="py-8">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <SkillsTimeline />
        </section>

        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Download My CV</h2>
          <DownloadCVButton />
        </section>
      </main>

      <footer className="bg-muted py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

