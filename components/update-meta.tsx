import type { Update } from "@/lib/updates"

export function UpdateMeta({ update, className = "" }: { update: Pick<Update, "week" | "date" | "displayDate">; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 text-sm text-muted-foreground ${className}`}>
    <span className="font-mono text-ember">Week {update.week}</span>
    <span aria-hidden="true">·</span>
    <time dateTime={update.date}>{update.displayDate}</time>
  </div>
}
