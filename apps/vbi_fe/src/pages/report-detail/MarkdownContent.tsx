import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownContentProps = {
  content: string;
};

export const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className="report-detail-markdown">
    <ReactMarkdown
      components={{
        a: ({ children, href }) => (
          <a href={href} rel="noreferrer" target="_blank">
            {children}
          </a>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  </div>
);
