export function isInsertInputType(inputType) {
  return inputType === "insertText"
}

export function isDeletionInputType(inputType) {
  return typeof inputType === "string" && inputType.startsWith("delete")
}

export function normalizeTypedCharacters(data) {
  if (!data) return []

  return [...String(data).normalize("NFC").toLowerCase()]
}
