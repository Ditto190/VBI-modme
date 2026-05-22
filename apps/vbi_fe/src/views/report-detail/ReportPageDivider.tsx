type ReportPageDividerProps = {
  index: number
  title: string
}

export const ReportPageDivider = ({ index, title }: ReportPageDividerProps) => (
  <div
    aria-label={`Page ${index + 1} ${title}`}
    className='report-detail-page-divider report-detail-page-divider-vertical'
    role='separator'
  >
    <span>
      <strong>{String(index + 1).padStart(2, '0')}</strong>
      <em>{title}</em>
    </span>
  </div>
)
