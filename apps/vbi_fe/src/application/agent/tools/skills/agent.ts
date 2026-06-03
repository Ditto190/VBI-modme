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
- await application.agent.model.change(modelId)
- await application.agent.model.changeThinkingLevel(thinkingLevel)
- application.agent.panel uses the same shape as application.layout.sidePanel

Avoid calling application.agent.chat.prompt() from the current agent unless the user explicitly asks to create or continue another conversation. Self-prompting can create confusing nested runs.

Example:

await application.agent.model.change("deepseek-v4-pro");
await application.agent.model.changeThinkingLevel("xhigh");
return json({ model: snapshot().agent.model });
`.trim()
