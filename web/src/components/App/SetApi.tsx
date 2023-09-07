import { GearIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'

const SetAPI = ({ onSave }: { onSave: (value: any) => void }) => {
  const [textContents, setTextContents] = React.useState(null)
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="gray" variant="soft">
          <GearIcon /> API Settings
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>API Settings</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          API Details are stored in your browser.
        </Dialog.Description>

        <div className="space-y-5">
          <TextField.Input size="2" id="openai" placeholder="OpenAI API Key" />
          <TextField.Input size="2" placeholder="Resend API Key" />
        </div>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={() => {
                onSave(textContents)
              }}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SetAPI
