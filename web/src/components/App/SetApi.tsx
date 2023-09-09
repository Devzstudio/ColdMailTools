import { GearIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'

import {
  SettingsActionTypes,
  useSettings,
} from 'src/providers/context/SettingsContext'

const SetAPI = () => {
  const { settings, settingsDispatch } = useSettings()

  const onUpdateSettings = (key: string, value: string) =>
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
          <GearIcon /> API Settings
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>API Settings</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          API Details are stored in your browser.
        </Dialog.Description>

        <div className="space-y-5">
          <div className="space-y-1">
            <Text color="gray" size="2">
              Resend API Key
            </Text>
            <TextField.Input
              size="2"
              placeholder="Resend API Key"
              value={settings.resend_api}
              onChange={(e) => onUpdateSettings('resend_api', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Text color="gray" size="2">
              From Email:
            </Text>
            <TextField.Input
              size="2"
              placeholder="From Email"
              value={settings.from_email}
              onChange={(e) => onUpdateSettings('from_email', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Text color="gray" size="2">
              OpenAI Api Key
            </Text>

            <TextField.Input
              size="2"
              id="openai"
              placeholder="OpenAI API Key"
              value={settings.openai_api}
              onChange={(e) => onUpdateSettings('openai_api', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Text color="gray" size="2">
              Twitter Username
            </Text>

            <TextField.Input
              size="2"
              id="openai"
              placeholder="Your twitter id: 167xxxxxx"
              value={settings.twitter_id}
              onChange={(e) => onUpdateSettings('twitter_id', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Text color="gray" size="2">
              Text Editor
            </Text>

            <div>
              <Select.Root
                defaultValue="textarea"
                //  value={settings.editor}
              >
                <Select.Trigger radius="large" />
                <Select.Content
                  onChange={(e) => {
                    console.log(e)
                  }}
                  onClick={(e) => {
                    console.log(e)
                  }}
                >
                  <Select.Item value="textarea">Textarea</Select.Item>
                  <Select.Item value="wysiwyg">WYSIWYG</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </div>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SetAPI
