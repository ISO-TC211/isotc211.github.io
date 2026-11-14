#!/usr/bin/env node
// Compare two feed files (Atom from jekyll-feed, RSS/Atom from @astrojs/rss).
// Collects every absolute URL from <loc>, <guid>, <id>, <link href>, and
// atom:link elements, optionally filters by site host, and compares the
// multisets. Order is ignored.
//
// Usage: node migrate/feed-check.mjs <old-feed.xml> <new-feed.xml> [--host schemas.isotc211.org]
import { readFileSync } from 'node:fs'

function parseArgs(argv) {
  const args = { host: null }
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--host') args.host = argv[++i]
    else positional.push(argv[i])
  }
  if (positional.length !== 2) {
    console.error('Usage: node migrate/feed-check.mjs <old-feed.xml> <new-feed.xml> [--host example.org]')
    process.exit(2)
  }
  return { oldFile: positional[0], newFile: positional[1], ...args }
}

function extractUrls(file) {
  const xml = readFileSync(file, 'utf8')
  const urls = []
  for (const m of xml.matchAll(/<(?:loc|guid|id)(?:\s[^>]*)?>([^<]+)<\/(?:loc|guid|id)>/g)) {
    const v = m[1].trim()
    if (/^https?:\/\//.test(v)) urls.push(v)
  }
  for (const m of xml.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/g)) {
    const v = m[1]
    if (/^https?:\/\//.test(v)) urls.push(v)
  }
  return urls
}

const { oldFile, newFile, host } = parseArgs(process.argv.slice(2))
const filter = host ? (u) => u.includes(host) : () => true

const oldUrls = extractUrls(oldFile).filter(filter)
const newUrls = extractUrls(newFile).filter(filter)

const count = (list) => {
  const m = new Map()
  for (const u of list) m.set(u, (m.get(u) || 0) + 1)
  return m
}
const oldCount = count(oldUrls)
const newCount = count(newUrls)

const missing = [...oldCount.keys()].filter((u) => (newCount.get(u) || 0) < oldCount.get(u))
const extra = [...newCount.keys()].filter((u) => (oldCount.get(u) || 0) < newCount.get(u))

console.log(`feed-check: old ${oldUrls.length} URLs, new ${newUrls.length} URLs${host ? ` (host: ${host})` : ''}`)
for (const u of missing) console.log(`  ! MISSING from new feed: ${u}`)
for (const u of extra) console.log(`  ! EXTRA in new feed: ${u}`)

const ok = missing.length === 0 && extra.length === 0
console.log(ok ? 'feed-check OK' : 'feed-check FAILED')
process.exit(ok ? 0 : 1)
