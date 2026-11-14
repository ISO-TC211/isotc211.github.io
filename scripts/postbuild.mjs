#!/usr/bin/env node
// Jekyll emitted posts as .html FILES at /{categories}/{yyyy}/{mm}/{dd}/{slug}.html;
// move Astro's directory output to those exact legacy file paths.
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'

const dist = join(process.cwd(), 'dist')
const posts = JSON.parse(readFileSync(join(process.cwd(), 'scripts', 'posts.json'), 'utf8'))

let moved = 0
for (const p of posts) {
  const { cats, date, slug } = p
  const dirPath = join(dist, ...cats.split('/'), ...date.split('-'), slug)
  const target = `${dirPath}.html`
  if (!existsSync(join(dirPath, 'index.html'))) {
    console.log(`postbuild: MISSING ${dirPath}`)
    process.exitCode = 1
    continue
  }
  mkdirSync(dirname(target), { recursive: true })
  renameSync(join(dirPath, 'index.html'), target)
  rmSync(dirPath, { recursive: true })
  moved++
  console.log(`postbuild: ${target.replace(dist, '')}`)
}
// prune any now-empty dirs under dist
function prune(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      prune(full)
      if (readdirSync(full).length === 0) rmSync(full, { recursive: true })
    }
  }
}
if (existsSync(dist)) prune(dist)
console.log(`postbuild: moved ${moved} post page(s) to legacy .html paths`)
