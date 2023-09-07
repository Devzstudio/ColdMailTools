import { useEffect } from 'react'

import {
  CopyIcon,
  MagicWandIcon,
  PaperPlaneIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Box, Button, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { Editor } from 'novel'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast, Toaster } from 'sonner'

import { MetaTags } from '@redwoodjs/web'

import ContactCard, { ContactInfo } from 'src/components/App/ContactCard'
import CSVUpload from 'src/components/App/CSVUpload'
import SetAPI from 'src/components/App/SetApi'
import SetMessageContents from 'src/components/App/SetMessageContents'

const HomePage = () => {
  const [showEditor, setShowEditor] = React.useState(false)
  const [messageContents, setMessageContents] = React.useState('')

  const [textContents, setTextContents] = React.useState('')
  const [htmlContents, setHtmlContents] = React.useState('')
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [list, setList] = React.useState([
    {
      name: 'Jijin P',
      email: 'jijin@devzstudio.com',
    },
    {
      name: 'Jithin P',
      email: 'jithin@devzstudio.com',
    },
  ])

  console.log('messageContents')
  console.log(messageContents)

  useEffect(() => {
    if (selectedUser) {
      setShowEditor(false)
      // lets update the localstorage value
      const item = window.localStorage.getItem(selectedUser.email)

      if (item) {
        const value = JSON.stringify(item)
          .replace('[NAME]', selectedUser.name)
          .replace('[EMAIL]', selectedUser.email)

        console.log(value)

        window.localStorage.setItem(selectedUser.email, JSON.parse(value))
        setShowEditor(true)
      } else {
        const item = window.localStorage.getItem('saved-message-contents')
        const value = JSON.stringify(item)
          .replace('[NAME]', selectedUser.name)
          .replace('[EMAIL]', selectedUser.email)

        window.localStorage.setItem(selectedUser.email, JSON.parse(value))
        setShowEditor(true)
      }
    }
  }, [selectedUser])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Toaster />
      <main
        className="dark-theme dark bg-[#010314] text-gray-100"
        style={{
          colorScheme: 'dark',
        }}
      >
        <div className="p-5">
          <h1 className="flex items-center space-x-2">
            <MagicWandIcon />
            <span>ColdMail.Tools</span>
          </h1>
        </div>

        <section className="grid gap-5 md:grid-cols-12">
          <Flex
            aria-colspan={2}
            direction="column"
            gap="3"
            className="col-span-3"
          >
            <Box height="5">
              <div className="space-y-1 p-2">
                {list.length > 0 && (
                  <div className="flex justify-end">
                    <Button
                      color="gray"
                      variant="soft"
                      onClick={() => {
                        setList([])
                        setSelectedUser(null)
                      }}
                    >
                      <TrashIcon />
                      Clear
                    </Button>
                  </div>
                )}

                {list.length === 0 ? (
                  <div className="grid place-items-center items-center space-y-3">
                    <CSVUpload
                      onSave={(val) => {
                        setList(val)
                      }}
                    />

                    <Button color="gray" variant="soft">
                      Example CSV
                    </Button>
                  </div>
                ) : (
                  <ScrollArea
                    className="space-y-5"
                    scrollbars="vertical"
                    style={{ height: 500 }}
                  >
                    {list.map((item) => (
                      <ContactCard
                        className="mb-2"
                        key={item.email}
                        item={item}
                        onSelect={(item) => setSelectedUser(item)}
                      />
                    ))}
                  </ScrollArea>
                )}
              </div>
            </Box>
          </Flex>
          <Flex direction="column" gap="3" grow={'1'} className="col-span-9">
            <div className="min-h-screen space-y-4 rounded-t-lg p-2">
              <div className="flex items-center space-x-5">
                <SetMessageContents
                  onSave={(contents) => setMessageContents(contents)}
                />
                <SetAPI onSave={(contents) => setMessageContents(contents)} />
              </div>
              {selectedUser ? (
                <>
                  <ContactInfo item={selectedUser} />

                  {showEditor ? (
                    <>
                      <Editor
                        //  className="h-50 min-h-screen"
                        defaultValue={messageContents}
                        onUpdate={(value) => {
                          setHtmlContents(value.getHTML())
                          setTextContents(value.getText())
                        }}
                        storageKey={selectedUser.email}
                      />

                      <Flex
                        direction="row"
                        gap="3"
                        align={'center'}
                        className="space-x-5 p-5"
                      >
                        <CopyToClipboard
                          text={htmlContents}
                          onCopy={() => toast('Copied to clipboard!')}
                        >
                          <Button color="gray" variant="ghost">
                            <CopyIcon /> Copy Html
                          </Button>
                        </CopyToClipboard>
                        <CopyToClipboard
                          text={textContents}
                          onCopy={() => toast('Copied to clipboard!')}
                        >
                          <Button color="gray" variant="ghost">
                            <CopyIcon /> Copy raw text
                          </Button>
                        </CopyToClipboard>

                        <Button variant="solid" size={'2'}>
                          <PaperPlaneIcon /> Send
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Text as="div" size="2" color="blue">
                        Set Message Contents to get started!
                      </Text>
                    </>
                  )}
                </>
              ) : (
                <div className="grid place-items-center items-center">
                  <Text as="div" size="2" color="blue">
                    Select user from left side!
                  </Text>
                </div>
              )}
            </div>
          </Flex>
        </section>
      </main>
    </>
  )
}

export default HomePage
