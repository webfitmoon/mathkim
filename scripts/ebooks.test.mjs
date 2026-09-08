import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url));
const json = path => JSON.parse(read(path));
const sha256 = value => createHash('sha256').update(value).digest('hex');

test('both full bilingual books preserve the source edition and all 19 sections', () => {
  const book = json('src/content/book/book.json');
  const story = json('src/content/story/story.json');
  const source = json('src/content/book-downloads.json').sources;
  assert.equal(book.chapters.length, 13);
  assert.equal(story.episodes.length, 6);
  for (const section of [...book.chapters, ...story.episodes]) {
    assert.ok(section.html.length > 100);
    assert.ok(section.htmlEn.length > 100);
  }
  for (const path of ['src/content/book/book.json', 'src/content/story/story.json']) {
    // Git's Windows checkout may use CRLF; the source manifest hashes LF text.
    assert.equal(sha256(read(path).toString().replace(/\r\n/g, '\n')), source[path], `${path} must remain verbatim`);
  }
});

test('all four PDF downloads match the original manifest byte for byte', () => {
  const files = json('src/content/book-downloads.json').files;
  assert.deepEqual(files.map(f => `${f.book}-${f.locale}`).sort(), ['book-en','book-ko','story-en','story-ko']);
  for (const file of files) {
    const pdf = read(`public${file.href}`);
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    assert.equal(pdf.length, file.bytes);
    assert.equal(sha256(pdf), file.sha256);
  }
});
