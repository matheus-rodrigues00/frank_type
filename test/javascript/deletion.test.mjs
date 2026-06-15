import assert from "node:assert/strict"
import test from "node:test"

import { backwardDeletionIntent, previousWordDeletionCount } from "../../app/javascript/lib/typing/deletion.js"

test("backwardDeletionIntent preserves plain backspace", () => {
  assert.equal(backwardDeletionIntent({ key: "Backspace" }), "character")
})

test("backwardDeletionIntent maps macOS word and start deletion shortcuts", () => {
  assert.equal(backwardDeletionIntent({ key: "Backspace", altKey: true }), "word")
  assert.equal(backwardDeletionIntent({ key: "Backspace", metaKey: true }), "start")
})

test("backwardDeletionIntent maps control backspace to word deletion", () => {
  assert.equal(backwardDeletionIntent({ key: "Backspace", ctrlKey: true }), "word")
})

test("backwardDeletionIntent ignores forward delete", () => {
  assert.equal(backwardDeletionIntent({ key: "Delete", altKey: true }), null)
})

test("previousWordDeletionCount deletes the previous word and trailing spaces", () => {
  assert.equal(previousWordDeletionCount("hello world"), 5)
  assert.equal(previousWordDeletionCount("hello world   "), 8)
  assert.equal(previousWordDeletionCount("hello"), 5)
  assert.equal(previousWordDeletionCount("   "), 3)
  assert.equal(previousWordDeletionCount(""), 0)
})

test("previousWordDeletionCount respects the current cursor", () => {
  assert.equal(previousWordDeletionCount("hello world again", 11), 5)
  assert.equal(previousWordDeletionCount("hello world again", 6), 6)
})
