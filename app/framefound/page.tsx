import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { feedAlternates } from "@/lib/site"

const title = "FrameFound"
const description = "FrameFound helps you find strong frames of people in video for YouTube thumbnails. Analyse recordings and export stills and contact sheets on your Mac."
const path = "/framefound"

export const metadata: Metadata = {
  title,
  description,
  alternates: { ...feedAlternates, canonical: path },
  openGraph: {
    title,
    description,
    type: "website",
    url: path,
    images: ["/opengraph-image"],
  },
}

export default function FrameFoundPage() {
  return (
    <div className="ember-shell min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="flex-1 px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="mb-5 text-sm font-medium text-muted-foreground">Coming soon</p>
          <h1 className="font-sans text-4xl md:text-5xl text-foreground leading-tight font-semibold">
            FrameFound
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            FrameFound is a macOS app that helps you find strong frames of people in video for YouTube thumbnails.
            It runs on Apple silicon with macOS 15 or later. Your recordings are analysed on your Mac and stay there.
          </p>
          {/* Add the download or purchase link here once distribution is decided. */}

          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-sans text-2xl md:text-3xl text-foreground leading-tight font-semibold">
              From recording to stills
            </h2>
            <ol className="mt-5 list-decimal space-y-4 pl-6 text-muted-foreground leading-relaxed">
              <li className="pl-1">
                <strong className="font-medium text-foreground">Open a recording.</strong>{" "}
                Start with a local MP4 or MOV. FrameFound works best with a single camera recording of one person.
              </li>
              <li className="pl-1">
                <strong className="font-medium text-foreground">Review the shortlist.</strong>{" "}
                FrameFound ranks frames from different moments. Pick the ones you like and step through nearby frames to refine your choice.
              </li>
              <li className="pl-1">
                <strong className="font-medium text-foreground">Export your picks.</strong>{" "}
                Save PNG or JPEG stills, or export a contact sheet to compare and share your options.
              </li>
            </ol>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
