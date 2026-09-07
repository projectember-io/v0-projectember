import { feedAlternates } from "@/lib/site"
import { SiteHeader } from "@/components/site-header"
import { UpdateMeta } from "@/components/update-meta"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { getAllUpdates } from "@/lib/updates"

export const metadata = { alternates: { ...feedAlternates, canonical: "/" } }

export default function HomePage() {
  const updates = getAllUpdates()
  const latestUpdate = updates[0]

  return (
    <div className="ember-shell min-h-screen bg-background flex flex-col">
      {/* Header */}
      <SiteHeader home />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 lg:pt-36 lg:pb-20">
          <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div>
              <h1 className="font-sans text-4xl md:text-5xl text-foreground leading-tight mb-6 text-balance font-semibold">
                My journey to build an autonomous AI organisation
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                Project Ember is a public experiment in building a team of specialised agents that think,
                coordinate, and work together to reduce the time I spend on life admin.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/updates"
                  className="inline-flex items-center justify-center gap-2 bg-ember text-primary-foreground px-5 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Read recent updates
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {latestUpdate && (
              <aside className="update-panel border border-border bg-card/70 rounded-lg p-5 shadow-2xl shadow-black/25 backdrop-blur transition-colors hover:border-ember/50">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="font-mono text-xs uppercase text-ember">Latest Update</p>
                    <h2 className="font-sans text-xl text-foreground font-semibold">{latestUpdate.title}</h2>
                  </div>
                  <BookOpen className="h-5 w-5 text-ember" />
                </div>

                <div className="update-line my-5" aria-hidden="true" />

                <div className="space-y-4">
                  <div>
                    <UpdateMeta update={latestUpdate} className="mb-2" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {latestUpdate.summary}
                    </p>
                  </div>
                </div>

                <Link
                  href={latestUpdate.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-ember hover:text-foreground transition-colors"
                >
                  Read update <ArrowRight className="h-4 w-4" />
                </Link>
              </aside>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-ember text-sm font-medium tracking-wide uppercase mb-8 block">About</span>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-sans text-2xl md:text-3xl text-foreground mb-6 leading-tight font-semibold">
                  A practical experiment in getting time back
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Project Ember started with a simple frustration: too much time disappearing into calendars,
                  reminders, project organisation, finances, grocery specials, homelab maintenance, and context
                  switching.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This isn&apos;t about replacing people or chasing AGI. It&apos;s a build-in-public journal about
                  designing a virtual team that can handle real, repetitive work and reduce mental overhead.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-card/80 border border-border rounded-lg p-6 backdrop-blur transition-colors hover:border-ember/50">
                  <h3 className="text-foreground font-medium mb-2">Life Admin</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The first target is the quiet overhead of everyday systems: remembering, organising,
                    tracking, maintaining, and following through.
                  </p>
                </div>
                <div className="bg-card/80 border border-border rounded-lg p-6 backdrop-blur transition-colors hover:border-ember/50">
                  <h3 className="text-foreground font-medium mb-2">Specialised Agents</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Rather than one assistant trying to do everything, each agent gets its own role,
                    context, responsibilities, and expertise.
                  </p>
                </div>
                <div className="bg-card/80 border border-border rounded-lg p-6 backdrop-blur transition-colors hover:border-ember/50">
                  <h3 className="text-foreground font-medium mb-2">Engineering Journal</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I&apos;ll document the experiments, architecture decisions, workflows, failures, and
                    moments where AI actually saves meaningful time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Updates */}
        <section id="updates" className="py-16 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-8 block">Recent Updates</span>
            
            <div className="space-y-1">
              {updates.map((update) => (
                <Link 
                  key={update.slug}
                  href={update.href}
                  className="group flex items-baseline justify-between py-4 border-b border-border hover:border-ember/50 transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-ember font-mono text-sm">Week {update.week}</span>
                    <h3 className="font-sans text-lg text-foreground group-hover:text-ember transition-colors font-medium">
                      {update.title}
                    </h3>
                  </div>
                  <time dateTime={update.date} className="text-muted-foreground text-sm hidden sm:block">{update.displayDate}</time>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
