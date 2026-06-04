import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
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

export async function generateMetadata({ params }: UpdatePageProps) {
  const { slug } = await params
  const update = getUpdateBySlug(slug)

  if (!update) {
    return {}
  }

  return {
    title: `${update.title} | Project Ember`,
    description: update.summary,
  }
}

function renderMarkdown(content: string) {
  return content.split(/\n{2,}/).map((block, index) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={block} className={`font-sans text-2xl md:text-3xl text-foreground mb-5 leading-tight font-semibold ${index === 0 ? "mt-0" : "mt-12"}`}>
          {block.replace(/^## /, "")}
        </h2>
      )
    }

    if (block.startsWith("> ")) {
      return (
        <blockquote key={block} className="my-8 border-l-2 border-ember pl-5 text-xl text-foreground">
          {block.replace(/^> /, "")}
        </blockquote>
      )
    }

    return (
      <p key={block} className="mb-6 text-muted-foreground leading-relaxed">
        {block}
      </p>
    )
  })
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params
  const update = getUpdateBySlug(slug)

  if (!update) {
    notFound()
  }

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
          <Link href="/updates" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Updates
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-6 py-20">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-ember">Week {update.week}</span>
            <span className="text-border">·</span>
            <time>{update.displayDate}</time>
          </div>
          <h1 className="font-sans text-4xl md:text-5xl text-foreground leading-tight font-semibold">
            {update.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {update.summary}
          </p>

          <div className="mt-6 border-t border-border pt-6">
            {renderMarkdown(update.content)}
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
