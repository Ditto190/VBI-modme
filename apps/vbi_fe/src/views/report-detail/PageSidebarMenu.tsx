import { Button } from '../../components/ui/button'
import { DropdownMenu, type DropdownItem } from '../../components/ui/dropdown-menu'
import { Ellipsis, FileText, PanelTop, PlusCircle, Trash2 } from '../../components/ui/icons'
import { useTranslation } from '../../i18n'

type PageSidebarMenuProps = {
  hasChart: boolean
  hasInsight: boolean
  pageCount: number
  pageId: string
  addChart: (pageId: string) => unknown
  addInsight: (pageId: string) => unknown
  removeChart: (pageId: string) => unknown
  removeInsight: (pageId: string) => unknown
  removePage: (pageId: string) => unknown
}

export const PageSidebarMenu = ({
  addChart,
  addInsight,
  hasChart,
  hasInsight,
  pageCount,
  pageId,
  removeChart,
  removeInsight,
  removePage,
}: PageSidebarMenuProps) => {
  const { t } = useTranslation()
  const menuItems: DropdownItem[] = [
    {
      disabled: hasChart,
      icon: <PlusCircle className='h-4 w-4' />,
      key: 'add-chart',
      label: t('reportDetail.addChart'),
      onSelect: () => void addChart(pageId),
    },
    {
      danger: true,
      disabled: !hasChart,
      icon: <PanelTop className='h-4 w-4' />,
      key: 'remove-chart',
      label: t('reportDetail.removeChart'),
      onSelect: () => void removeChart(pageId),
    },
    {
      disabled: hasInsight,
      icon: <PlusCircle className='h-4 w-4' />,
      key: 'add-insight',
      label: t('reportDetail.addInsight'),
      onSelect: () => void addInsight(pageId),
    },
    {
      danger: true,
      disabled: !hasInsight,
      icon: <FileText className='h-4 w-4' />,
      key: 'remove-insight',
      label: t('reportDetail.removeInsight'),
      onSelect: () => void removeInsight(pageId),
    },
    {
      danger: true,
      disabled: pageCount <= 1,
      icon: <Trash2 className='h-4 w-4' />,
      key: 'delete-page',
      label: t('reportDetail.deletePage'),
      onSelect: () => void removePage(pageId),
    },
  ]

  return (
    <DropdownMenu
      items={menuItems}
      trigger={
        <Button
          aria-label={t('reportDetail.pageMenu')}
          className='report-detail-page-menu'
          icon={<Ellipsis className='h-4 w-4' />}
          size='icon'
          variant='ghost'
        />
      }
    />
  )
}
