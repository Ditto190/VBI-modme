import { Input, Modal, message } from 'antd';
import { useTranslation } from '../../i18n';
import type { ResourceItem } from '../../types';

type Props = {
  createName: string;
  editing: ResourceItem | null;
  isCreateOpen: boolean;
  renameValue: string;
  onCloseCreate: () => void;
  onConfirmCreate: () => Promise<void>;
  onConfirmRename: () => Promise<void>;
  onCreateNameChange: (value: string) => void;
  onRenameCancel: () => void;
  onRenameValueChange: (value: string) => void;
};

export const ReportResourceModals = ({
  createName,
  editing,
  isCreateOpen,
  renameValue,
  onCloseCreate,
  onConfirmCreate,
  onConfirmRename,
  onCreateNameChange,
  onRenameCancel,
  onRenameValueChange,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        open={isCreateOpen}
        title={t('reports.createTitle')}
        onOk={async () => {
          if (!createName.trim()) {
            message.warning(t('reports.nameRequired'));
            return;
          }
          await onConfirmCreate();
        }}
        onCancel={onCloseCreate}
      >
        <Input
          value={createName}
          onChange={(event) => onCreateNameChange(event.target.value)}
        />
      </Modal>
      <Modal
        open={!!editing}
        title={t('reports.renameTitle')}
        onOk={onConfirmRename}
        onCancel={onRenameCancel}
      >
        <Input
          value={renameValue}
          onChange={(event) => onRenameValueChange(event.target.value)}
        />
      </Modal>
    </>
  );
};
