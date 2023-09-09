import { useReducer } from 'react'

const InitialState = {
  subject: '',
  message: '',
  openai_api: '[API]',
  resend_api: '',
  editor: 'textarea',
  twitter_username: '',
  twitter_id: '',
}

type State = typeof InitialState

interface IContextProps {
  settings: State
  settingsDispatch: React.Dispatch<Actions>
}

interface Actions {
  type: string
  payload?: Record<string, string | State | any>
}

const SettingsContext = React.createContext({} as IContextProps)
SettingsContext.displayName = 'SettingsContext'

const SettingsActionTypes = {
  SET_SETTINGS: 'SET_SETTINGS',
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case SettingsActionTypes.SET_SETTINGS:
      return { ...state, ...action.payload }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState)

  return (
    <SettingsContext.Provider
      value={{ settings: state, settingsDispatch: dispatch }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = () => {
  const context = React.useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return {
    settings: context.settings,
    settingsDispatch: context.settingsDispatch,
  }
}

export { SettingsActionTypes, SettingsContext, SettingsProvider, useSettings }
