import assert from "node:assert/strict"
import test from "node:test"

import { isDeletionInputType, isInsertInputType, normalizeTypedCharacters } from "../../app/javascript/lib/typing/input_text.js"

test("normalizeTypedCharacters lowercases and keeps accented characters", () => {
  assert.deepEqual(normalizeTypedCharacters("Á"), ["á"])
  assert.deepEqual(normalizeTypedCharacters("ÇÃO"), ["ç", "ã", "o"])
})

test("normalizeTypedCharacters composes decomposed accents into single NFC code points", () => {
  const decomposed = "a\u0301" // a + U+0301 combining acute accent (decomposed)

  assert.equal(decomposed.length, 2)
  assert.deepEqual(normalizeTypedCharacters(decomposed), ["\u00e1"])
})

test("normalizeTypedCharacters returns an empty array for empty input", () => {
  assert.deepEqual(normalizeTypedCharacters(null), [])
  assert.deepEqual(normalizeTypedCharacters(""), [])
})

test("isInsertInputType matches only plain text insertion", () => {
  assert.equal(isInsertInputType("insertText"), true)
  assert.equal(isInsertInputType("insertCompositionText"), false)
  assert.equal(isInsertInputType("insertFromPaste"), false)
})

test("isDeletionInputType matches backward deletion input types", () => {
  assert.equal(isDeletionInputType("deleteContentBackward"), true)
  assert.equal(isDeletionInputType("deleteWordBackward"), true)
  assert.equal(isDeletionInputType("insertText"), false)
  assert.equal(isDeletionInputType(undefined), false)
})
