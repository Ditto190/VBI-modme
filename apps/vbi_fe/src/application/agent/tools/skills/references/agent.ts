export const agentApplicationSkill = `
# Agent Application API

Use application.getState().agent for conversation, model, and panel operations.

Conversation state:
- application.getState().agent.chat.snapshot
- application.getState().agent.chat.errorMessage
- application.getState().agent.chat.isLoading
- application.getState().agent.conversations.activeId
- application.getState().agent.conversations.items
- application.getState().agent.model.selectedId
- application.getState().agent.model.thinkingLevel

Commands:
- application.getState().agent.chat.activate(options)
- await application.getState().agent.chat.open(conversationId)
- application.getState().agent.chat.clear()
- await application.getState().agent.conversations.refresh()
- await application.getState().agent.conversations.open(id)
- await application.getState().agent.conversations.rename(id, title)
- await application.getState().agent.conversations.delete(id)
- application.getState().agent.model.list()
- await application.getState().agent.model.change(modelId)
- application.getState().agent.model.listThinking()
- await application.getState().agent.model.changeThinking(thinkingLevel)
- application.getState().agent.panel uses the same shape as application.getState().layout.sidePanel

Call application.getState().agent.model.list() before changing the model, and application.getState().agent.model.listThinking()
before changing thinkingLevel. For conversation open, rename, or delete, use application.getState().agent.conversations.items
or await application.getState().agent.conversations.refresh() first, then operate only on a returned id.

Avoid calling application.getState().agent.chat.prompt() from the current agent unless the user explicitly asks to create or continue another conversation. Self-prompting can create confusing nested runs.

Example:

const models = application.getState().agent.model.list();
const thinkingLevels = application.getState().agent.model.listThinking();
const nextModel = models.find((model) => model.id !== snapshot().agent.model.selectedId)?.id ?? snapshot().agent.model.selectedId;
const nextThinkingLevel =
  thinkingLevels.find((level) => level !== snapshot().agent.model.thinkingLevel) ?? snapshot().agent.model.thinkingLevel;
assert(models.some((model) => model.id === nextModel), "Model must be returned by application.getState().agent.model.list()");
assert(
  thinkingLevels.includes(nextThinkingLevel),
  "Thinking level must be returned by application.getState().agent.model.listThinking()",
);
await application.getState().agent.model.change(nextModel);
await application.getState().agent.model.changeThinking(nextThinkingLevel);
const conversations = await application.getState().agent.conversations.refresh();
const currentConversation = conversations.find((item) => item.id === snapshot().agent.conversations.activeId);
return json({ conversations, currentConversation, models, thinkingLevels, model: snapshot().agent.model });
`.trim()
