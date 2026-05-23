import { Button } from '../../components/ui/button'
import { DropdownMenu, type DropdownItem } from '../../components/ui/dropdown-menu'
import { Ellipsis, FileText, PanelTop, PlusCircle, Trash2 } from '../../components/ui/icons'
import { useTranslation } from '../../i18n'
import { cn } from '../../lib/utils'

export type PageSidebarMenuActions = {
  addChart: (pageId: string) => unknown
  addInsight: (pageId: string) => unknown
  removeChart: (pageId: string) => unknown
  removeInsight: (pageId: string) => unknown
  removePage: (pageId: string) => unknown
}

type PageSidebarMenuProps = {
  actions: PageSidebarMenuActions
  hasChart: boolean
  hasInsight: boolean
  isActive: boolean
  pageCount: number
  pageId: string
}

export const PageSidebarMenu = ({
  actions,
  hasChart,
  hasInsight,
  isActive,
  pageCount,
  pageId,
}: PageSidebarMenuProps) => {
  const { t } = useTranslation()
  const menuItems: DropdownItem[] = [
    {
      disabled: hasChart,
      icon: <PlusCircle className='h-4 w-4' />,
      key: 'add-chart',
      label: t('reportDetail.addChart'),
      onSelect: () => void actions.addChart(pageId),
    },
    {
      danger: true,
      disabled: !hasChart,
      icon: <PanelTop className='h-4 w-4' />,
      key: 'remove-chart',
      label: t('reportDetail.removeChart'),
      onSelect: () => void actions.removeChart(pageId),
    },
    {
      disabled: hasInsight,
      icon: <PlusCircle className='h-4 w-4' />,
      key: 'add-insight',
      label: t('reportDetail.addInsight'),
      onSelect: () => void actions.addInsight(pageId),
    },
    {
      danger: true,
      disabled: !hasInsight,
      icon: <FileText className='h-4 w-4' />,
      key: 'remove-insight',
      label: t('reportDetail.removeInsight'),
      onSelect: () => void actions.removeInsight(pageId),
    },
    {
      danger: true,
      disabled: pageCount <= 1,
      icon: <Trash2 className='h-4 w-4' />,
      key: 'delete-page',
      label: t('reportDetail.deletePage'),
      onSelect: () => void actions.removePage(pageId),
    },
  ]

  return (
    <DropdownMenu
      items={menuItems}
      trigger={
        <Button
          aria-label={t('reportDetail.pageMenu')}
          className={cn(
            'mr-1 h-6 w-6 min-w-6 justify-self-end rounded text-[var(--vbi-text-soft)] opacity-0 pointer-events-none -translate-x-1 scale-95 transition duration-150 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:scale-100 group-focus-within:opacity-100 max-[640px]:h-7 max-[640px]:w-7 max-[640px]:min-w-7',
            isActive && 'pointer-events-auto translate-x-0 scale-100 opacity-100',
          )}
          icon={<Ellipsis className='h-4 w-4' />}
          size='icon'
          variant='ghost'
        />
      }
    />
  )
}
