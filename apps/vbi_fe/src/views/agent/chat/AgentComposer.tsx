'use client'

import {
  AttachmentPrimitive,
  AuiIf,
  ComposerPrimitive,
  unstable_useSlashCommandAdapter,
  type Unstable_SlashCommand,
} from '@assistant-ui/react'
import { memo, useMemo } from 'react'
import { DropdownMenu } from '../../../components/ui/dropdown-menu'
import { ArrowUp, Bot, CheckCircle2, ChevronDown, Plus, Square, X } from '../../../components/ui/icons'
import type { Translate } from '../../../i18n'
import type { AgentModelId, AgentModelOption, AgentThinkingLevel } from '../../../application/agent/agent-model-config'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const agentThinkingLevelOptions = [
  { id: 'high' as const, labelKey: 'agent.thinkingHigh' },
  { id: 'xhigh' as const, labelKey: 'agent.thinkingMax' },
]

const resolveAgentModelOptionLabel = (option: AgentModelOption, t: (key: string) => string) =>
  option.labelKey ? t(option.labelKey) : option.label

const ComposerAttachment = () => (
  <AttachmentPrimitive.Root className='vbi-agent-composer-attachment'>
    <AttachmentPrimitive.unstable_Thumb className='vbi-agent-composer-attachment-thumb' aria-hidden='true' />
    <span className='vbi-agent-composer-attachment-name'>
      <AttachmentPrimitive.Name />
    </span>
    <AttachmentPrimitive.Remove
      aria-label='Remove attachment'
      className='vbi-agent-composer-attachment-remove'
      type='button'
    >
      <X className='h-3.5 w-3.5' />
    </AttachmentPrimitive.Remove>
  </AttachmentPrimitive.Root>
)

const SlashCommandIcon = ({ icon }: { icon: unknown }) => {
  if (icon === 'model') return <Bot className='h-4 w-4' aria-hidden='true' />
  return <ChevronDown className='h-4 w-4' aria-hidden='true' />
}

const SlashCommandItems = ({ modelId, t }: { modelId: AgentModelId; t: Translate }) => (
  <ComposerPrimitive.Unstable_TriggerPopoverItems className='vbi-agent-command-items'>
    {(items) =>
      items.map((item, index) => {
        const metadata = isRecord(item.metadata) ? item.metadata : {}
        const selected = metadata.modelId === modelId

        return (
          <ComposerPrimitive.Unstable_TriggerPopoverItem
            className='vbi-agent-command-item'
            item={item}
            index={index}
            key={item.id}
          >
            <span className='vbi-agent-command-icon'>
              <SlashCommandIcon icon={metadata.icon} />
            </span>
            <span className='vbi-agent-command-copy'>
              <span className='vbi-agent-command-title'>{item.label}</span>
              {item.description ? <span className='vbi-agent-command-description'>{item.description}</span> : null}
            </span>
            {selected ? (
              <span className='vbi-agent-command-selected' aria-label={t('agent.commandSelected')}>
                <CheckCircle2 className='h-4 w-4' aria-hidden='true' />
              </span>
            ) : null}
          </ComposerPrimitive.Unstable_TriggerPopoverItem>
        )
      })
    }
  </ComposerPrimitive.Unstable_TriggerPopoverItems>
)

const AgentConfigControls = ({
  disabled,
  modelId,
  modelOptions,
  onModelChange,
  onThinkingLevelChange,
  thinkingLevel,
  t,
}: {
  disabled: boolean
  modelId: AgentModelId
  modelOptions: AgentModelOption[]
  onModelChange: (modelId: AgentModelId) => void
  onThinkingLevelChange: (thinkingLevel: AgentThinkingLevel) => void
  thinkingLevel: AgentThinkingLevel
  t: Translate
}) => {
  const selectedModel = modelOptions.find((option) => option.id === modelId) ?? modelOptions[0]
  const selectedThinkingLevel =
    agentThinkingLevelOptions.find((option) => option.id === thinkingLevel) ?? agentThinkingLevelOptions[0]
  const selectedModelLabel = selectedModel ? resolveAgentModelOptionLabel(selectedModel, t) : modelId
  const selectedThinkingLabel = t(selectedThinkingLevel.labelKey)
  const selectedConfigLabel = t('agent.configTriggerLabel', {
    model: selectedModelLabel,
    thinking: selectedThinkingLabel,
  })

  return (
    <DropdownMenu
      items={[
        { key: 'thinking-label', label: t('agent.thinkingSection'), type: 'label' },
        ...agentThinkingLevelOptions.map((option) => ({
          key: `thinking-${option.id}`,
          label: (
            <span className='vbi-agent-option-label'>
              <span>{t(option.labelKey)}</span>
              {option.id === thinkingLevel ? <CheckCircle2 className='h-3.5 w-3.5' aria-hidden='true' /> : null}
            </span>
          ),
          onSelect: () => onThinkingLevelChange(option.id),
        })),
        { key: 'model-separator', type: 'separator' as const },
        { key: 'model-label', label: t('agent.modelSection'), type: 'label' as const },
        ...modelOptions.map((option) => ({
          key: `model-${option.id}`,
          label: (
            <span className='vbi-agent-option-label'>
              <span>{resolveAgentModelOptionLabel(option, t)}</span>
              {option.id === modelId ? <CheckCircle2 className='h-3.5 w-3.5' aria-hidden='true' /> : null}
            </span>
          ),
          onSelect: () => onModelChange(option.id),
        })),
      ]}
      menuClassName='vbi-agent-config-menu'
      placement='top-end'
      trigger={
        <button
          aria-label={selectedConfigLabel}
          className='vbi-agent-composer-option'
          disabled={disabled}
          type='button'
        >
          <span>{selectedConfigLabel}</span>
          <ChevronDown className='h-3.5 w-3.5' aria-hidden='true' />
        </button>
      }
    />
  )
}

type AgentComposerProps = {
  disabled: boolean
  modelId: AgentModelId
  modelOptions: AgentModelOption[]
  onModelChange: (modelId: AgentModelId) => void
  onThinkingLevelChange: (thinkingLevel: AgentThinkingLevel) => void
  t: Translate
  thinkingLevel: AgentThinkingLevel
  usageText: string
}

const AgentComposerContent = ({
  disabled,
  modelId,
  modelOptions,
  onModelChange,
  onThinkingLevelChange,
  t,
  thinkingLevel,
  usageText,
}: AgentComposerProps) => {
  const slashCommands = useMemo<readonly Unstable_SlashCommand[]>(
    () =>
      modelOptions.map((option) => ({
        id: `model-${option.id}`,
        label: `/${option.id.replace(/^deepseek-v4-/, '')}`,
        description: resolveAgentModelOptionLabel(option, t),
        icon: 'model',
        metadata: { modelId: option.id },
        execute: () => onModelChange(option.id),
      })),
    [modelOptions, onModelChange, t],
  )
  const slash = unstable_useSlashCommandAdapter({ commands: slashCommands, removeOnExecute: true })

  return (
    <ComposerPrimitive.AttachmentDropzone className='vbi-agent-composer-dropzone'>
      <ComposerPrimitive.Unstable_TriggerPopoverRoot>
        <ComposerPrimitive.Unstable_TriggerPopover
          aria-label={t('agent.commandMenuLabel')}
          adapter={slash.adapter}
          char='/'
          className='vbi-agent-command-popover'
        >
          <ComposerPrimitive.Unstable_TriggerPopover.Action
            onExecute={slash.action.onExecute}
            removeOnExecute={slash.action.removeOnExecute}
          />
          <SlashCommandItems modelId={modelId} t={t} />
        </ComposerPrimitive.Unstable_TriggerPopover>
        <ComposerPrimitive.Root className='vbi-agent-composer'>
          <div className='vbi-agent-composer-field'>
            <ComposerPrimitive.Input
              aria-label={t('nav.agent')}
              className='vbi-agent-composer-input'
              placeholder={t('agent.composerPlaceholder')}
              rows={2}
              submitMode='enter'
            />
            <div className='vbi-agent-composer-attachments'>
              <ComposerPrimitive.Attachments>{() => <ComposerAttachment />}</ComposerPrimitive.Attachments>
            </div>
          </div>
          <div className='vbi-agent-composer-toolbar'>
            <div className='vbi-agent-composer-controls'>
              <ComposerPrimitive.AddAttachment
                aria-label='Attach image'
                className='vbi-agent-composer-action vbi-agent-composer-attach'
                multiple
                type='button'
              >
                <Plus className='h-5 w-5' />
              </ComposerPrimitive.AddAttachment>
            </div>
            <div className='vbi-agent-composer-send-group'>
              <div className='vbi-agent-context-usage'>{usageText}</div>
              <AgentConfigControls
                disabled={disabled}
                modelId={modelId}
                modelOptions={modelOptions}
                onModelChange={onModelChange}
                onThinkingLevelChange={onThinkingLevelChange}
                thinkingLevel={thinkingLevel}
                t={t}
              />
              <AuiIf condition={(state) => state.thread.isRunning}>
                <ComposerPrimitive.Cancel
                  aria-label='Stop'
                  className='vbi-agent-composer-action vbi-agent-composer-submit'
                  type='button'
                >
                  <Square className='h-4 w-4' />
                </ComposerPrimitive.Cancel>
              </AuiIf>
              <AuiIf condition={(state) => !state.thread.isRunning}>
                <ComposerPrimitive.Send
                  aria-label='Send'
                  className='vbi-agent-composer-action vbi-agent-composer-submit'
                  type='button'
                >
                  <ArrowUp className='h-5 w-5' />
                </ComposerPrimitive.Send>
              </AuiIf>
            </div>
          </div>
        </ComposerPrimitive.Root>
      </ComposerPrimitive.Unstable_TriggerPopoverRoot>
    </ComposerPrimitive.AttachmentDropzone>
  )
}

export const AgentComposer = memo(AgentComposerContent)
