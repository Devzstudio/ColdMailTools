import { Pencil1Icon } from '@radix-ui/react-icons'
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Editor } from 'novel'

import {
  SettingsActionTypes,
  useSettings,
} from 'src/providers/context/SettingsContext'

const SetMessageContents = ({ onSave }: { onSave: (value: any) => void }) => {
  const { settings, settingsDispatch } = useSettings()

  const onUpdateSettings = (key: string, value: any) =>
    settingsDispatch({
      type: SettingsActionTypes.SET_SETTINGS,
      payload: {
        ...settings,
        [key]: value,
      },
    })

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
          <div className="space-y-1">
            <Text color="gray" size="2">
              Subject
            </Text>
            <TextField.Input
              size="2"
              id="openai"
              placeholder="Message Subject"
              value={settings.subject}
              onChange={(e) => onUpdateSettings('subject', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Text color="gray" size="2">
              Message
            </Text>

            {settings.editor === 'textarea' ? (
              <TextArea
                rows={20}
                className="h-50 min-h-screen"
                placeholder="Type your message here..."
                value={settings.message}
                onChange={(e) => onUpdateSettings('message', e.target.value)}
              />
            ) : (
              <Editor
                className="h-50 mb-2 rounded-lg border border-gray-600 p-2 pb-24 text-sm"
                defaultValue={''}
                onUpdate={(value) => {
                  onUpdateSettings('message', value.getJSON())
                }}
                storageKey="saved-message-contents"
              />
            )}
          </div>
        </div>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              onClick={() => {
                onSave(settings.message)
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
