import { useTranslation } from '../../i18n'

type ReportPageDividerProps = {
  index: number
  title: string
}

export const ReportPageDivider = ({ index, title }: ReportPageDividerProps) => {
  const { t } = useTranslation()
  const pageNumber = index + 1

  return (
    <div
      aria-label={t('reportDetail.pageDividerLabel', { index: pageNumber, title })}
      className='grid grid-cols-[minmax(24px,1fr)_auto_minmax(24px,1fr)] items-center gap-2.5 text-[11px] font-semibold text-[var(--vbi-text-soft)] opacity-80 before:h-px before:min-w-0 before:bg-[var(--vbi-border)] after:h-px after:min-w-0 after:bg-[var(--vbi-border)]'
      data-report-divider='page'
      role='separator'
    >
      <span className='inline-flex h-6 max-w-[min(320px,72vw)] min-w-0 items-center gap-1.5 rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-surface-solid)] px-2.5'>
        <strong className='block min-w-0 text-[10px] font-inherit text-[var(--vbi-text-soft)] [font-variant-numeric:tabular-nums]'>
          {String(pageNumber).padStart(2, '0')}
        </strong>
        <em className='block min-w-0 truncate not-italic'>{title}</em>
      </span>
    </div>
  )
}
