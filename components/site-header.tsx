import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function SiteHeader({ home = false, backHref = "/", backLabel = "Home" }: { home?: boolean; backHref?: string; backLabel?: string }) {
  return <header className={`${home ? "fixed top-0 left-0 right-0 z-50 " : ""}border-b border-border bg-background/80 backdrop-blur-sm`}>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <nav aria-label="Main navigation" className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-3 items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <Image src="/images/logo.png" alt="" width={32} height={32} />
        <span className="text-foreground font-medium">Project Ember</span>
      </Link>
      {home ? <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link href="#about" className="hover:text-foreground">About</Link>
        <Link href="#updates" className="hover:text-foreground">Updates</Link>
      </div> : <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />{backLabel}
      </Link>}
    </nav>
  </header>
}
