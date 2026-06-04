import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, ExternalLink } from "lucide-react"

const updates = [
  {
    week: 1,
    title: "Launch",
    date: "June 2, 2026",
    description: "Introducing Project Ember — a public experiment in building autonomous AI systems that work together. Starting with the why, the vision, and the first steps.",
    featured: true,
  },
  {
    week: 2,
    title: "Architecture Decisions",
    date: "June 9, 2026",
    description: "Exploring the foundational architecture for agent communication, task delegation, and memory systems.",
    featured: false,
  },
  {
    week: 3,
    title: "First Agent",
    date: "June 16, 2026",
    description: "Building the first specialised agent: a research assistant capable of gathering and synthesising information autonomously.",
    featured: false,
  },
]

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "current",
    items: ["Core architecture design", "Agent communication protocol", "Memory and context systems"],
  },
  {
    phase: "Phase 2",
    title: "Specialisation",
    status: "upcoming",
    items: ["Research agent", "Writing agent", "Code agent"],
  },
  {
    phase: "Phase 3",
    title: "Coordination",
    status: "upcoming",
    items: ["Multi-agent workflows", "Task orchestration", "Self-improvement loops"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Project Ember"
              width={32}
              height={32}
              className="transition-transform group-hover:scale-105"
            />
            <span className="text-foreground font-medium tracking-tight">Project Ember</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              About
            </Link>
            <Link href="#updates" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Updates
            </Link>
            <Link href="#roadmap" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Roadmap
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          {/* Noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Primary ember glow - larger and more prominent */}
          <div 
            className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle, rgba(192, 98, 54, 0.12) 0%, rgba(192, 98, 54, 0.04) 40%, transparent 70%)',
            }}
          />
          {/* Secondary subtle glow on right */}
          <div 
            className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle, rgba(192, 98, 54, 0.06) 0%, transparent 60%)',
            }}
          />
          {/* Subtle vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
            }}
          />
          <div className="max-w-5xl mx-auto relative">
            <div className="flex items-start gap-8 mb-8">
              <Image
                src="/images/logo.png"
                alt="Project Ember"
                width={140}
                height={140}
                className="opacity-95 flex-shrink-0 mt-1"
              />
              <div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight mb-6">
                  Building an autonomous AI organisation.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
                  Project Ember is a public experiment in creating specialised AI agents that work together — 
                  learning, adapting, and building alongside their human collaborators.
                </p>
                <div>
                <Link 
                    href="#updates" 
                    className="inline-flex items-center gap-2 bg-ember text-primary-foreground px-5 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Read the latest update
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Update - Featured */}
        <section id="updates" className="py-16 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-ember text-sm font-medium tracking-wide uppercase mb-8 block">Latest Update</span>
            
            {updates.filter(u => u.featured).map((update) => (
              <article key={update.week} className="group">
                <Link href={`/updates/week-${update.week}`} className="block bg-card border border-border rounded-lg p-8 md:p-10 hover:border-ember/30 transition-colors">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm mb-4">
                    <span className="text-ember font-mono">Week {update.week}</span>
                    <span className="text-border">·</span>
                    <time>{update.date}</time>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 group-hover:text-ember transition-colors">
                    {update.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {update.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-ember text-sm mt-6 group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-8 block">Recent Updates</span>
            
            <div className="space-y-1">
              {updates.filter(u => !u.featured).map((update) => (
                <Link 
                  key={update.week}
                  href={`/updates/week-${update.week}`}
                  className="group flex items-baseline justify-between py-4 border-b border-border hover:border-ember/30 transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-ember font-mono text-sm">Week {update.week}</span>
                    <h3 className="font-serif text-lg text-foreground group-hover:text-ember transition-colors">
                      {update.title}
                    </h3>
                  </div>
                  <time className="text-muted-foreground text-sm hidden sm:block">{update.date}</time>
                </Link>
              ))}
            </div>
            
            <Link 
              href="/updates"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-ember text-sm mt-8 transition-colors"
            >
              View all updates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-ember text-sm font-medium tracking-wide uppercase mb-8 block">About</span>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 leading-tight">
                  A long-term experiment in autonomous systems
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Project Ember explores what happens when you build AI systems designed to work together, 
                  not just respond to prompts. Each agent has its own specialisation, memory, and ability 
                  to collaborate with others.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This is a build-in-public project. Every decision, experiment, and failure is documented 
                  here. The goal isn&apos;t to build a product — it&apos;s to learn what&apos;s possible when AI 
                  systems are designed for autonomy from the start.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-foreground font-medium mb-2">Specialised Agents</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Each agent is designed for a specific domain — research, writing, code, coordination — 
                    with its own tools and knowledge.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-foreground font-medium mb-2">Shared Memory</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Agents share context and learn from each other, building a collective understanding 
                    over time.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-foreground font-medium mb-2">Human-First Design</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Autonomy doesn&apos;t mean replacement. These systems are designed to augment and 
                    collaborate, not to work in isolation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-24 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-ember text-sm font-medium tracking-wide uppercase mb-8 block">Roadmap</span>
            
            <div className="grid md:grid-cols-3 gap-6">
              {roadmap.map((phase) => (
                <div 
                  key={phase.phase}
                  className={`bg-card border rounded-lg p-6 ${
                    phase.status === "current" 
                      ? "border-ember/50" 
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      phase.status === "current" 
                        ? "bg-ember-muted text-ember" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {phase.phase}
                    </span>
                    {phase.status === "current" && (
                      <span className="text-ember text-xs">Current</span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                          phase.status === "current" ? "bg-ember" : "bg-muted-foreground"
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Project Ember"
              width={24}
              height={24}
              className="opacity-70"
            />
            <span className="text-muted-foreground text-sm">Project Ember</span>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com" 
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
            <Link 
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5" />
            </Link>
            <Link 
              href="https://jamieeverett.io"
              target="_blank"
              className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors"
            >
              JamieEverett.io
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
