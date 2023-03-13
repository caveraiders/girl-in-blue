import Button from '@/components/Button'
import Link from 'next/link'
import Image from 'next/image'

type OtherSiteProps = {
  link: string
  name: string
  icon: string
  isDisabled: boolean
  size?: 'sm' | 'md'
}

const OtherSite = ({
  link,
  name,
  icon,
  isDisabled,
  size = 'sm',
}: OtherSiteProps) => (
  <Link href={link} target="_blank">
    <Button
      appearance="secondary"
      variant="outlined"
      size={size}
      isDisabled={isDisabled}
    >
      <Image
        src={icon}
        width={size === 'sm' ? 16 : 20}
        height={size === 'sm' ? 16 : 20}
        alt={name}
        className="rounded-full"
      />
      {name}
    </Button>
  </Link>
)

export default OtherSite
