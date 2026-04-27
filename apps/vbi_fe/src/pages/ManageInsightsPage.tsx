import { Button, Drawer, Input, Modal, Space, message } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useInsightBuilderModel } from '../models';
import { useManageInsightsStore } from '../stores/manage-insights.store';
import { ManageResourcePageShell } from './manage-resource/ManageResourcePageShell';
import { matchesResourceSearch } from '../utils/resource-list';
import { getSessionUserName } from '../utils/collaboration';
import { createResourceColumns } from './manage-resource/resource-columns';

const userName = getSessionUserName();
const insightEditorDrawerWidth = 'min(720px, 92vw)';

export const ManageInsightsPage = () => {
  const { locale, t } = useTranslation();
  const createContent = useManageInsightsStore((state) => state.createContent);
  const createName = useManageInsightsStore((state) => state.createName);
  const createOpen = useManageInsightsStore((state) => state.createOpen);
  const editorName = useManageInsightsStore((state) => state.editorName);
  const items = useManageInsightsStore((state) => state.items);
  const loading = useManageInsightsStore((state) => state.loading);
  const searchText = useManageInsightsStore((state) => state.searchText);
  const selectedId = useManageInsightsStore((state) => state.selectedId);
  const selectedRowKeys = useManageInsightsStore(
    (state) => state.selectedRowKeys,
  );
  const bootstrap = useManageInsightsStore((state) => state.bootstrap);
  const clearSelection = useManageInsightsStore(
    (state) => state.clearSelection,
  );
  const closeCreate = useManageInsightsStore((state) => state.closeCreate);
  const closeDetail = useManageInsightsStore((state) => state.closeDetail);
  const create = useManageInsightsStore((state) => state.create);
  const deleteOne = useManageInsightsStore((state) => state.deleteOne);
  const deleteSelected = useManageInsightsStore(
    (state) => state.deleteSelected,
  );
  const dispose = useManageInsightsStore((state) => state.dispose);
  const openCreate = useManageInsightsStore((state) => state.openCreate);
  const openDetail = useManageInsightsStore((state) => state.openDetail);
  const renameSelected = useManageInsightsStore(
    (state) => state.renameSelected,
  );
  const selectAllFiltered = useManageInsightsStore(
    (state) => state.selectAllFiltered,
  );
  const setCreateContent = useManageInsightsStore(
    (state) => state.setCreateContent,
  );
  const setCreateName = useManageInsightsStore((state) => state.setCreateName);
  const setEditorName = useManageInsightsStore((state) => state.setEditorName);
  const setSearchText = useManageInsightsStore((state) => state.setSearchText);
  const setSelectedRowKeys = useManageInsightsStore(
    (state) => state.setSelectedRowKeys,
  );
  const insightSession = useInsightBuilderModel(
    (state) => state.sessions[selectedId],
  );
  const insightContent = insightSession?.builder?.build().content ?? '';
  const filteredItems = items.filter((item) =>
    matchesResourceSearch(item, searchText),
  );

  useEffect(() => {
    void bootstrap(userName);
    return () => {
      void dispose();
    };
  }, [bootstrap, dispose]);

  const columns = createResourceColumns({
    deleteTitle: t('insights.deleteTitle'),
    fallbackName: t('insights.untitled'),
    locale,
    onEdit: openDetail,
    onRemove: deleteOne,
    t,
  });

  return (
    <ManageResourcePageShell
      columns={columns}
      createLabel={t('insights.create')}
      dataSource={filteredItems}
      loading={loading}
      onBatchDelete={async () => {
        if (!selectedRowKeys.length) return;
        await deleteSelected();
      }}
      onClearSelection={clearSelection}
      onCreate={openCreate}
      onSearchTextChange={setSearchText}
      onSelectAllFiltered={selectAllFiltered}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys.map(String)),
      }}
      searchText={searchText}
      selectedRowKeys={selectedRowKeys}
      title={t('insights.title')}
    >
      <Modal
        open={createOpen}
        title={t('insights.createTitle')}
        onOk={async () => {
          if (!createName.trim()) {
            message.warning(t('insights.nameRequired'));
            return;
          }
          await create();
        }}
        onCancel={closeCreate}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Input
            value={createName}
            placeholder={t('insights.titlePlaceholder')}
            onChange={(event) => setCreateName(event.target.value)}
          />
          <Input.TextArea
            rows={6}
            value={createContent}
            placeholder={t('insights.contentPlaceholder')}
            onChange={(event) => setCreateContent(event.target.value)}
          />
        </Space>
      </Modal>
      <Drawer
        width={insightEditorDrawerWidth}
        open={!!selectedId}
        title={editorName || t('insights.editorTitle')}
        onClose={() => void closeDetail()}
        extra={
          <Button onClick={() => void closeDetail()}>
            {t('common.close')}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Input
            value={editorName}
            placeholder={t('insights.titlePlaceholder')}
            onChange={(event) => setEditorName(event.target.value)}
            onBlur={() => void renameSelected()}
            onPressEnter={() => void renameSelected()}
          />
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 20 }}
            value={insightContent}
            placeholder={t('insights.editContentPlaceholder')}
            onChange={(event) => {
              insightSession?.builder?.setContent(event.target.value);
            }}
          />
        </Space>
      </Drawer>
    </ManageResourcePageShell>
  );
};
