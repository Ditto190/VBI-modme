import { Box, Text } from 'ink'
import React from 'react'

const renderLine = (line: string, index: number, color?: string) => {
  const list = /^(\s*)([-*]|\d+\.)\s+(.+)$/.exec(line)
  if (list)
    return (
      <Text color={color} key={index}>
        {list[1]}- {list[3]}
      </Text>
    )
  return (
    <Text color={color} key={index}>
      {line}
    </Text>
  )
}

export const MarkdownText = ({ children, color }: { children: string; color?: string }) => {
  const lines = children.split('\n')
  const nodes: React.ReactNode[] = []
  let code: string[] = []
  let codeKey = 0
  let inCode = false

  const flushCode = () => {
    if (!code.length) return
    nodes.push(
      <Box flexDirection="column" key={`code-${codeKey++}`} paddingLeft={2}>
        <Text color="green">{code.join('\n')}</Text>
      </Box>,
    )
    code = []
  }

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      inCode = !inCode
      if (!inCode) flushCode()
      return
    }
    if (inCode) {
      code.push(line)
      return
    }
    nodes.push(renderLine(line, index, color))
  })
  flushCode()

  return <Box flexDirection="column">{nodes}</Box>
}
