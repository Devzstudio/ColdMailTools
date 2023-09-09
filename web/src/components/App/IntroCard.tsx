import { GearIcon, RocketIcon, UploadIcon } from '@radix-ui/react-icons'

export const Card = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon?: React.ReactNode
}) => {
  return (
    <div
      className="rounded-lg p-5"
      //  border border-gray-800 bg-[#191919]
    >
      <div className="my-2">{icon}</div>
      <h4 className="mt-6 font-medium">{title}</h4>
      <p className="mt-2 text-sm text-gray-300">{description}</p>
    </div>
  )
}

const IntroCard = () => {
  return (
    <div className="mt-10 grid gap-10 pr-2 md:grid-cols-3">
      <Card
        title="1. Upload CSV"
        description="Upload a CSV file with your contacts."
        icon={<UploadIcon className="h-10 w-10" />}
      />
      <Card
        title="2. Update Settings"
        description="Set your message contents & settings."
        icon={<GearIcon className="h-10 w-10" />}
      />
      <Card
        title="3. Send Message"
        description="Send Message to your contacts via email, whatsapp, telegram or x"
        icon={<RocketIcon className="h-10 w-10" />}
      />
    </div>
  )
}

export default IntroCard
