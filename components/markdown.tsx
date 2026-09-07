import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function Markdown({ children }: { children: string }) {
  return <div className="article-content"><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{
    table: ({ children }) => <div className="article-table" role="region" aria-label="Scrollable article table" tabIndex={0}><table>{children}</table></div>,
  }}>{children}</ReactMarkdown></div>
}
