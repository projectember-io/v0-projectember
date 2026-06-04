import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { getAllUpdates } from "@/lib/updates"

export default function UpdatesPage() {
  const updates = getAllUpdates()

  return (
    <div className="ember-shell min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Project Ember"
              width={32}
              height={32}
              className="transition-transform group-hover:scale-105"
            />
            <span className="text-foreground font-medium">Project Ember</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="mb-5 font-mono text-xs uppercase text-ember">Updates</p>
          <h1 className="font-sans text-4xl md:text-5xl text-foreground leading-tight font-semibold">
            Recent updates
          </h1>

          <div className="mt-12 space-y-1">
            {updates.map((update) => (
              <Link
                key={update.slug}
                href={update.href}
                className="group block border-b border-border py-6 transition-colors hover:border-ember/50"
              >
                <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-mono text-ember">Week {update.week}</span>
                  <span className="text-border">·</span>
                  <time>{update.displayDate}</time>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <h2 className="font-sans text-2xl text-foreground group-hover:text-ember transition-colors font-semibold">
                    {update.title}
                  </h2>
                  <ArrowRight className="h-5 w-5 shrink-0 text-ember" />
                </div>
                <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                  {update.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
