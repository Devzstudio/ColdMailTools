import { Theme } from '@radix-ui/themes'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import '@radix-ui/themes/styles.css'
import Routes from 'src/Routes'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import './index.css'

const App = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500&display=swap"
      rel="stylesheet"
    ></link>
    <Theme
      // accentColor="blue"
      grayColor="olive"
      // panelBackground="solid"
      scaling="100%"
      radius="medium"
      appearance="dark"
    >
      <FatalErrorBoundary page={FatalErrorPage}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </RedwoodProvider>
      </FatalErrorBoundary>
    </Theme>
  </>
)

export default App
