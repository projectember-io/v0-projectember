import { feedAlternates } from "@/lib/site"
import type { Metadata } from "next"
import { Markdown } from "@/components/markdown"
import { SiteHeader } from "@/components/site-header"
import { UpdateMeta } from "@/components/update-meta"
import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { getAllUpdates, getUpdateBySlug } from "@/lib/updates"

type UpdatePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllUpdates().map((update) => ({
    slug: update.slug,
  }))
}

export async function generateMetadata({ params }: UpdatePageProps): Promise<Metadata> {
  const { slug } = await params
  const update = getUpdateBySlug(slug)

  if (!update) {
    return {}
  }

  return {
    title: update.title,
    description: update.summary,
    alternates: { ...feedAlternates, canonical: update.href },
    openGraph: {
      title: update.title,
      description: update.summary,
      type: "article",
      url: update.href,
      publishedTime: `${update.date}T00:00:00.000Z`,
      authors: ["Jamie Everett"],
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image" as const, title: update.title, description: update.summary, images: ["/opengraph-image"] },
  }
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params
  const update = getUpdateBySlug(slug)

  if (!update) {
    notFound()
  }

  return (
    <div className="ember-shell min-h-screen bg-background flex flex-col">
      <SiteHeader backHref="/updates" backLabel="Updates" />

      <main id="main-content" tabIndex={-1} className="flex-1 px-6 py-20">
        <article className="max-w-3xl mx-auto">
          <UpdateMeta update={update} className="mb-8" />
          <h1 className="font-sans text-4xl md:text-5xl text-foreground leading-tight font-semibold">
            {update.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {update.summary}
          </p>

          <div className="mt-6 border-t border-border pt-6">
            <Markdown>{update.content}</Markdown>
          </div>

          <footer className="mt-14 border-t border-border pt-8">
            <p className="text-xl text-foreground font-medium">Jamie Everett</p>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
