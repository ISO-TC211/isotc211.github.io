import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import { postPath } from '../lib/slug'

export async function GET(context: APIContext) {
  const posts = (await getCollection('news')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
  return rss({
    title: 'ISO/TC 211',
    description: 'Resource site for ISO/TC 211 Geographic information/Geomatics',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: postPath(post.data.date, post.id, post.data.categories),
    })),
    customData: '<language>en</language>',
  })
}
