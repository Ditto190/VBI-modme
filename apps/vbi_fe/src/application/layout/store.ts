import { createStore } from 'zustand/vanilla'
import { useManageSidebarStore } from '../../stores/manage-sidebar.store'
import { useWorkspaceSidePanelStore } from '../../stores/workspace-side-panel.store'
import { getLayoutApplication } from './application'
import type { LayoutApplication } from './contract'

export const layoutApplicationStore = createStore<LayoutApplication>()(() => getLayoutApplication())

const refreshLayoutApplication = () => {
  layoutApplicationStore.setState(getLayoutApplication(), true)
}

useManageSidebarStore.subscribe(refreshLayoutApplication)
useWorkspaceSidePanelStore.subscribe(refreshLayoutApplication)
