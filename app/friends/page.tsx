import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allPages } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import FriendCard from '@/components/FriendCard'

const mdxComponents = {
    FriendCard,
}

export const metadata = genPageMetadata({ title: '友情链接' })

export default function Friends() {
    const friendsContent = allPages.find((p) => p.slug === 'friends')

    return (
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        {friendsContent?.title || '友情链接'}
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        {friendsContent?.description || '这里是我的朋友们'}
                    </p>
                </div>
                {friendsContent && (
                    <div className="container py-12">
                        <MDXLayoutRenderer code={friendsContent.body.code} components={mdxComponents} />
                    </div>
                )}
            </div>
        </>
    )
}