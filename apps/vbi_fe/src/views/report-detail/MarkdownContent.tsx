import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownContentProps = {
  content: string
}

const blockMotion = 'vbi-motion-row'
const headingClassName = `${blockMotion} mt-2.5 text-[var(--vbi-text-strong)] font-[680] leading-[1.3]`
const tableCellClassName = 'border-b border-[var(--vbi-border)] px-3 py-2.5 text-left'

export const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className='grid w-full gap-3 overflow-visible text-[13px] leading-[1.58] text-[var(--vbi-text)] [overflow-wrap:anywhere]'>
    <ReactMarkdown
      components={{
        a: ({ children, href }) => (
          <a className='font-semibold text-[var(--vbi-primary)]' href={href} rel='noreferrer' target='_blank'>
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote
            className={`${blockMotion} m-0 rounded-r-lg border-l-[3px] border-[var(--vbi-primary)] bg-[var(--vbi-quote)] px-3 py-2.5 text-[var(--vbi-text-muted)]`}
          >
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className='rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-code-bg)] px-1.5 py-px text-[0.92em] text-[var(--vbi-code-ink)]'>
            {children}
          </code>
        ),
        h1: ({ children }) => <h1 className={`${headingClassName} text-[23px]`}>{children}</h1>,
        h2: ({ children }) => <h2 className={`${headingClassName} text-lg`}>{children}</h2>,
        h3: ({ children }) => <h3 className={`${headingClassName} text-[15px]`}>{children}</h3>,
        h4: ({ children }) => <h4 className={`${headingClassName} text-[15px]`}>{children}</h4>,
        h5: ({ children }) => <h5 className={`${headingClassName} text-[15px]`}>{children}</h5>,
        li: ({ children }) => <li className='marker:font-bold marker:text-[var(--vbi-active-text)]'>{children}</li>,
        ol: ({ children }) => <ol className={`${blockMotion} m-0 grid gap-2 pl-6`}>{children}</ol>,
        p: ({ children }) => <p className={`${blockMotion} m-0 max-w-none`}>{children}</p>,
        pre: ({ children }) => (
          <pre
            className={`${blockMotion} m-0 overflow-auto rounded-lg border border-[var(--vbi-border)] bg-[#111827] p-3 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[#f9fafb]`}
          >
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className={`${blockMotion} max-w-full overflow-x-auto`}>
            <table className='w-full border-collapse rounded-lg border border-[var(--vbi-border)] text-[13px] whitespace-nowrap'>
              {children}
            </table>
          </div>
        ),
        td: ({ children }) => <td className={tableCellClassName}>{children}</td>,
        th: ({ children }) => (
          <th className={`${tableCellClassName} bg-[var(--vbi-table-head)] font-bold text-[var(--vbi-text-strong)]`}>
            {children}
          </th>
        ),
        tr: ({ children }) => <tr className='last:[&_td]:border-b-0'>{children}</tr>,
        ul: ({ children }) => <ul className={`${blockMotion} m-0 grid gap-2 pl-6`}>{children}</ul>,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  </div>
)
