import { useEffect } from 'react'

import {
  CopyIcon,
  GearIcon,
  MagicWandIcon,
  PaperPlaneIcon,
  TrashIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Editor } from 'novel'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import GitHubButton from 'react-github-button'
import { toast, Toaster } from 'sonner'

import { MetaTags } from '@redwoodjs/web'

import ContactCard, { ContactInfo } from 'src/components/App/ContactCard'
import CSVUpload from 'src/components/App/CSVUpload'
import IntroCard, { Card } from 'src/components/App/IntroCard'
import SetAPI from 'src/components/App/SetApi'
import SetMessageContents from 'src/components/App/SetMessageContents'
import { useSettings } from 'src/providers/context/SettingsContext'

const HomePage = () => {
  const { settings } = useSettings()

  const [messageContents, setMessageContents] = React.useState('')
  const [subjectText, setMessageSubject] = React.useState('')

  const [textContents, setTextContents] = React.useState('')
  const [htmlContents, setHtmlContents] = React.useState('')

  const [selectedUser, setSelectedUser] = React.useState(null)
  const [list, setList] = React.useState([
    {
      name: 'Jijin P',
      email: 'jijin@devzstudio.com',
      twitter: 'pjijin_',
      status: 'completed',
    },
    {
      name: 'Jithin P',
      email: 'jithin@devzstudio.com',
    },
  ])

  useEffect(() => {
    if (selectedUser) {
      setMessageSubject(
        settings.subject
          .replace('[NAME]', selectedUser.name)
          .replace('[EMAIL]', selectedUser.email)
      )

      if (settings.editor === 'textarea') {
        setTextContents(
          settings.message
            .replace('[NAME]', selectedUser.name)
            .replace('[EMAIL]', selectedUser.email)
        )
      } else {
        const item = window.localStorage.getItem(selectedUser.email)

        if (item) {
          const value = JSON.stringify(item)
            .replace('[NAME]', selectedUser.name)
            .replace('[EMAIL]', selectedUser.email)

          console.log(value)

          window.localStorage.setItem(selectedUser.email, JSON.parse(value))
        } else {
          const item = window.localStorage.getItem('saved-message-contents')
          const value = JSON.stringify(item)
            .replace('[NAME]', selectedUser.name)
            .replace('[EMAIL]', selectedUser.email)

          window.localStorage.setItem(selectedUser.email, JSON.parse(value))
        }
      }
    }
  }, [selectedUser, settings])

  const markAsCompleted = (item) => {
    const index = list.findIndex((x) => x.email === item.email)

    if (index !== -1) {
      const newList = [...list]
      newList[index].status = 'completed'
      setList(newList)
    }
  }

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
        <div className="flex items-center justify-between border-b border-gray-800 p-5">
          <h1 className="flex items-center space-x-2">
            <MagicWandIcon />
            <span>ColdMail.Tools</span>
          </h1>

          <GitHubButton
            type="stargazers"
            namespace="Devzstudio"
            repo="coldmailtools"
            className="sm:mr-2"
          />
        </div>

        <section className="grid gap-5 md:grid-cols-12">
          <Flex
            aria-colspan={2}
            direction="column"
            gap="3"
            className="col-span-3 border-r border-gray-800 pr-2"
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
                <SetAPI />
              </div>
              {selectedUser ? (
                <>
                  {settings.message !== '' ? (
                    <>
                      <ContactInfo item={selectedUser} />

                      <div className="space-y-1">
                        <Text color="gray" size="2">
                          Subject
                        </Text>

                        <TextField.Input
                          size="2"
                          id="openai"
                          placeholder="Message Subject"
                          value={subjectText}
                          onChange={(e) => setMessageSubject(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Text color="gray" size="2">
                          Message
                        </Text>
                        {settings.editor === 'textarea' ? (
                          <TextArea
                            rows={18}
                            className="h-50 min-h-screen"
                            placeholder="Type your message here..."
                            value={textContents}
                            onChange={(e) => setTextContents(e.target.value)}
                          />
                        ) : (
                          <Editor
                            //  className="h-50 min-h-screen"
                            defaultValue={messageContents}
                            onUpdate={(value) => {
                              setHtmlContents(value.getHTML())
                              setTextContents(value.getText())
                            }}
                            storageKey={selectedUser.email}
                          />
                        )}
                      </div>

                      <Flex
                        justify={'between'}
                        direction="row"
                        gap="3"
                        align={'center'}
                        className="p-5"
                      >
                        <div className="flex items-center space-x-5">
                          <span className="text-xs text-gray-500">Copy</span>
                          <CopyToClipboard
                            text={subjectText}
                            onCopy={() => toast('Copied to clipboard!')}
                          >
                            <Button color="gray" variant="ghost">
                              <CopyIcon /> Subject
                            </Button>
                          </CopyToClipboard>

                          {settings.editor === 'textarea' ? null : (
                            <CopyToClipboard
                              text={htmlContents}
                              onCopy={() => {
                                toast('Copied to clipboard!')
                                markAsCompleted(selectedUser)
                              }}
                            >
                              <Button color="gray" variant="ghost">
                                <CopyIcon /> Html
                              </Button>
                            </CopyToClipboard>
                          )}

                          <CopyToClipboard
                            text={textContents}
                            onCopy={() => {
                              toast('Copied to clipboard!')
                              markAsCompleted(selectedUser)
                            }}
                          >
                            <Button color="gray" variant="ghost">
                              <CopyIcon />

                              {settings.editor === 'textarea'
                                ? 'Message'
                                : 'Raw text'}
                            </Button>
                          </CopyToClipboard>
                        </div>

                        <div className="flex items-center space-x-5">
                          <span className="text-xs text-gray-500">
                            Send Message on{' '}
                          </span>

                          {settings.twitter_id && selectedUser.twitter_id ? (
                            <a
                              href={`https://twitter.com/messages/${
                                settings.twitter_id
                              }-${selectedUser.twitter_id}?text=${encodeURI(
                                textContents
                              )}`}
                            >
                              <Button
                                onClick={() => {
                                  markAsCompleted(selectedUser)
                                }}
                                color="gray"
                                variant="ghost"
                                size={'2'}
                              >
                                <TwitterLogoIcon /> Twitter
                              </Button>
                            </a>
                          ) : null}

                          <a
                            href={`https://web.whatsapp.com/send?text=${encodeURI(
                              textContents
                            )}`}
                            target="_BLANK"
                            rel="noreferrer noopener"
                            onClick={() => {
                              markAsCompleted(selectedUser)
                            }}
                          >
                            <Button color="gray" variant="ghost" size={'2'}>
                              WhatsApp
                            </Button>
                          </a>
                          <a
                            href={`https://t.me/share/url?url=${encodeURI(
                              textContents
                            )}`}
                            onClick={() => {
                              markAsCompleted(selectedUser)
                            }}
                            target="_BLANK"
                            rel="noreferrer noopener"
                          >
                            <Button color="gray" variant="ghost" size={'2'}>
                              Telegram
                            </Button>
                          </a>
                          {settings.resend_api ? (
                            <Button
                              onClick={() => {
                                markAsCompleted(selectedUser)
                              }}
                              variant="solid"
                              size={'2'}
                            >
                              <PaperPlaneIcon /> Mail
                            </Button>
                          ) : null}
                        </div>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Card
                        title="Set Message Contets"
                        description="Set your message contents & settings."
                        icon={<GearIcon className="h-10 w-10" />}
                      />
                    </>
                  )}
                </>
              ) : (
                <div className="grid place-items-center items-center">
                  <IntroCard />
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
