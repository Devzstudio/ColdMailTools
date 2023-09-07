import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import { Editor } from 'novel'

const SetMessageContents = ({ onSave }: { onSave: (value: any) => void }) => {
  const [textContents, setTextContents] = React.useState(null)
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="gray" variant="soft">
          <Pencil1Icon /> Set Message Contents
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>Set Message Contents</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You can set custom Message Contents here.
        </Dialog.Description>

        <div className="space-y-5">
          <TextField.Input size="3" id="openai" placeholder="Message Subject" />
          <Editor
            className="h-50 mb-2 rounded-lg border border-gray-600 p-2 pb-24 text-sm"
            defaultValue={''}
            onUpdate={(value) => {
              setTextContents(value.getJSON())
            }}
            storageKey="saved-message-contents"
          />
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

export default SetMessageContents
