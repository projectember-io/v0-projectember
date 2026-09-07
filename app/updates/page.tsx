import { feedAlternates } from "@/lib/site"
import { SiteHeader } from "@/components/site-header"
import { UpdateMeta } from "@/components/update-meta"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { getAllUpdates } from "@/lib/updates"

export const metadata = { title: "Updates", alternates: { ...feedAlternates, canonical: "/updates" } }

export default function UpdatesPage() {
  const updates = getAllUpdates()

  return (
    <div className="ember-shell min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="flex-1 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="mb-5 font-mono text-xs uppercase text-ember">Updates</p>
          <h1 className="font-sans text-4xl md:text-5xl text-foreground leading-tight font-semibold">
            Recent updates
          </h1>

          <div className="mt-12 space-y-1">
            {updates.length === 0 && <p className="text-muted-foreground">No updates published yet.</p>}
            {updates.map((update) => (
              <Link
                key={update.slug}
                href={update.href}
                className="group block border-b border-border py-6 transition-colors hover:border-ember/50"
              >
                <UpdateMeta update={update} className="mb-3" />
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
