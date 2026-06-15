export function backwardDeletionIntent(event) {
  if (event.key !== "Backspace") return null

  if (event.metaKey) return "start"
  if (event.altKey || event.ctrlKey) return "word"

  return "character"
}

export function previousWordDeletionCount(text, cursor = text.length) {
  let index = Math.min(Math.max(cursor, 0), text.length)

  while (index > 0 && isWhitespace(text[index - 1])) index -= 1
  while (index > 0 && !isWhitespace(text[index - 1])) index -= 1

  return cursor - index
}

function isWhitespace(character) {
  return /\s/.test(character)
}
