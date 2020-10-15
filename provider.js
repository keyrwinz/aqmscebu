import React, { useState } from 'react'

export const AppCtx = React.createContext()

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [node, setNode] = useState('test-usc-mc-4')

  return (
    <AppCtx.Provider value={{
      user,
      node,
      updateUser: (userInfo) => setUser(userInfo),
      updateNode: (id) => setNode(id),
    }}
    >
      {children}
    </AppCtx.Provider>
  )
}

// eslint-disable-next-line react/prop-types
export default ({ element }) => (
  <Provider>
    {element}
  </Provider>
)
