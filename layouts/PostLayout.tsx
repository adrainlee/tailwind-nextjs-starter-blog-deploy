import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import FloatingButtons from '@/components/FloatingButtons'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  const metaItems = [
    {
      key: 'authors',
      content: (
        <div className="flex items-center space-x-2">
          {authorDetails.map((author) => (
            <span key={author.name} className="text-gray-700 dark:text-gray-300">
              {author.name}
            </span>
          ))}
        </div>
      ),
    },
    ...(tags && tags.length > 0
      ? [
          {
            key: 'tags',
            content: (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      key: 'date',
      content: (
        <time dateTime={date} className="text-gray-500 dark:text-gray-400">
          {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
        </time>
      ),
    },
  ]

  return (
    <SectionContainer>
      <FloatingButtons />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-4 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                {metaItems.map((item) => (
                  <div key={item.key}>{item.content}</div>
                ))}
              </div>
            </div>
          </header>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>
              {siteMetadata.comments && (
                <div
                  key="comments-section"
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            {siteMetadata.comments && (
              <footer key="footer-comments" className="py-4">
                <div className="text-center text-gray-700 dark:text-gray-300" id="comment">
                  <Comments slug={slug} />
                </div>
              </footer>
            )}
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
