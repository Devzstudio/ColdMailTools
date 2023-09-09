import { SettingsProvider } from './SettingsContext'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  return <SettingsProvider>{children}</SettingsProvider>
}

export default AllContextProviders
