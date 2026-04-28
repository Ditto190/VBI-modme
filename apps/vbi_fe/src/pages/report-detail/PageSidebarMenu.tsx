import {
  DeleteOutlined,
  EllipsisOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
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
  const menuItems: MenuProps['items'] = [
    {
      disabled: hasChart,
      icon: <PlusCircleOutlined />,
      key: 'add-chart',
      label: t('reportDetail.addChart'),
      onClick: () => void addChart(pageId),
    },
    {
      danger: true,
      disabled: !hasChart,
      icon: <FundProjectionScreenOutlined />,
      key: 'remove-chart',
      label: t('reportDetail.removeChart'),
      onClick: () => void removeChart(pageId),
    },
    {
      disabled: hasInsight,
      icon: <PlusCircleOutlined />,
      key: 'add-insight',
      label: t('reportDetail.addInsight'),
      onClick: () => void addInsight(pageId),
    },
    {
      danger: true,
      disabled: !hasInsight,
      icon: <FileTextOutlined />,
      key: 'remove-insight',
      label: t('reportDetail.removeInsight'),
      onClick: () => void removeInsight(pageId),
    },
    { type: 'divider' },
    {
      danger: true,
      disabled: pageCount <= 1,
      icon: <DeleteOutlined />,
      key: 'delete-page',
      label: t('reportDetail.deletePage'),
      onClick: () => void removePage(pageId),
    },
  ]

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button
        aria-label={t('reportDetail.pageMenu')}
        className="report-detail-page-menu"
        icon={<EllipsisOutlined />}
        shape="circle"
        size="small"
        type="text"
        onClick={(event) => event.stopPropagation()}
      />
    </Dropdown>
  )
}
