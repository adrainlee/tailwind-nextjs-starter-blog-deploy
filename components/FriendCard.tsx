import Image from './Image'
import Link from './Link'

interface FriendCardProps {
    name: string
    avatar: string
    description: string
    link: string
}

const FriendCard = ({ name, avatar, description, link }: FriendCardProps) => (
    <div className="md max-w-[544px] p-4 md:w-1/2">
        <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
            <Link href={link} aria-label={`Link to ${name}`}>
                <Image
                    alt={name}
                    src={avatar}
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                />
            </Link>
            <div className="p-6">
                <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                    <Link href={link} aria-label={`Link to ${name}`}>
                        {name}
                    </Link>
                </h2>
                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
                <Link
                    href={link}
                    className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Link to ${name}`}
                >
                    访问网站 &rarr;
                </Link>
            </div>
        </div>
    </div>
)

export default FriendCard