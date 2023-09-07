import { Badge, Box, Card, Flex, Text } from '@radix-ui/themes'
import Avatar, { genConfig } from 'react-nice-avatar'

export const ContactInfo = ({ item }: { item: any }) => {
  return (
    <Flex gap="3" align="center">
      <Avatar className="h-12 w-12" {...genConfig(item.email)} />

      <Box>
        <Text as="div" size="2" weight="bold">
          {item.name}
        </Text>
        <Text as="div" size="2" color="gray">
          {item.email}
        </Text>
        <Badge color="green">Completed</Badge>
      </Box>
    </Flex>
  )
}

const ContactCard = ({
  item,
  onSelect,
  className,
}: {
  className?: string
  item?: {
    name: string
    email: string
  }
  onSelect: (item: any) => void
}) => {
  return (
    <Card
      style={{
        backgroundColor: '#191919',
      }}
      onClick={() => onSelect(item)}
      className={`cursor-pointer ${className}`}
    >
      <ContactInfo item={item} />
    </Card>
  )
}

export default ContactCard
