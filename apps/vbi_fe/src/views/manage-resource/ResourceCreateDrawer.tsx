import type { ReactNode } from 'react'
import { Button } from '../../components/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import { toast } from '../../components/ui/toast'

type ResourceCreateDrawerProps = {
  cancelLabel: string
  children: ReactNode
  closeLabel: string
  confirmLabel: string
  invalidMessage?: string
  open: boolean
  title: string
  isValid?: () => boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export const ResourceCreateDrawer = ({
  cancelLabel,
  children,
  closeLabel,
  confirmLabel,
  invalidMessage,
  isValid,
  onClose,
  onConfirm,
  open,
  title,
}: ResourceCreateDrawerProps) => (
  <Drawer
    open={open}
    direction='right'
    onOpenChange={(nextOpen) => {
      if (!nextOpen) onClose()
    }}
  >
    <DrawerContent className='resource-create-drawer overflow-hidden' showHandle={false}>
      <DrawerHeader>
        <div>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription className='sr-only'>{title}</DrawerDescription>
        </div>
        <DrawerCloseButton label={closeLabel} />
      </DrawerHeader>
      <DrawerBody className='resource-create-drawer-body grid content-start gap-3 p-4'>{children}</DrawerBody>
      <DrawerFooter>
        <Button variant='secondary' onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            if (isValid && !isValid()) {
              if (invalidMessage) toast.warning(invalidMessage)
              return
            }
            void onConfirm()
          }}
        >
          {confirmLabel}
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)
