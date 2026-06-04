export const agentApplicationSkill = `
# Agent Application API

Use application.agent for conversation, model, and panel operations.

Conversation state:
- application.agent.chat.snapshot
- application.agent.chat.errorMessage
- application.agent.chat.isLoading
- application.agent.conversations.activeId
- application.agent.conversations.items
- application.agent.model.selectedId
- application.agent.model.thinkingLevel

Commands:
- application.agent.chat.activate(options)
- await application.agent.chat.open(conversationId)
- application.agent.chat.clear()
- await application.agent.conversations.refresh()
- await application.agent.conversations.open(id)
- await application.agent.conversations.rename(id, title)
- await application.agent.conversations.delete(id)
- application.agent.model.list()
- await application.agent.model.change(modelId)
- application.agent.model.listThinking()
- await application.agent.model.changeThinking(thinkingLevel)
- application.agent.panel uses the same shape as application.layout.sidePanel

Call application.agent.model.list() before changing the model, and application.agent.model.listThinking()
before changing thinkingLevel. For conversation open, rename, or delete, use application.agent.conversations.items
or await application.agent.conversations.refresh() first, then operate only on a returned id.

Avoid calling application.agent.chat.prompt() from the current agent unless the user explicitly asks to create or continue another conversation. Self-prompting can create confusing nested runs.

Example:

const models = application.agent.model.list();
const thinkingLevels = application.agent.model.listThinking();
const nextModel = models.find((model) => model.id !== snapshot().agent.model.selectedId)?.id ?? snapshot().agent.model.selectedId;
const nextThinkingLevel =
  thinkingLevels.find((level) => level !== snapshot().agent.model.thinkingLevel) ?? snapshot().agent.model.thinkingLevel;
assert(models.some((model) => model.id === nextModel), "Model must be returned by application.agent.model.list()");
assert(
  thinkingLevels.includes(nextThinkingLevel),
  "Thinking level must be returned by application.agent.model.listThinking()",
);
await application.agent.model.change(nextModel);
await application.agent.model.changeThinking(nextThinkingLevel);
const conversations = await application.agent.conversations.refresh();
const currentConversation = conversations.find((item) => item.id === snapshot().agent.conversations.activeId);
return json({ conversations, currentConversation, models, thinkingLevels, model: snapshot().agent.model });
`.trim()
