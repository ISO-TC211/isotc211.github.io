export function postSlug(id: string): string {
  return id.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

/** Jekyll permalink: /{categories joined}/{yyyy}/{mm}/{dd}/{slug}.html */
export function postPath(date: Date, id: string, categories: string[]): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const cats = categories.join('/')
  return `/${cats}/${yyyy}/${mm}/${dd}/${postSlug(id)}.html`
}
