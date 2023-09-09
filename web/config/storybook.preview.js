import React from 'react'

import AllContextProviders from '../src/providers/context'

export const decorators = [
  (Story) => (
    <AllContextProviders>
      <Story />
    </AllContextProviders>
  ),
]
