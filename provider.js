import React, { useState } from 'react'

export const UserCtx = React.createContext()

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [node, setNode] = useState('usc-mc')

  return (
    <UserCtx.Provider value={{
      user,
      node,
      updateUser: (userInfo) => setUser(userInfo),
      updateNode: (id) => setNode(id),
    }}
    >
      {children}
    </UserCtx.Provider>
  )
}

// eslint-disable-next-line react/prop-types
export default ({ element }) => (
  <Provider>
    {element}
  </Provider>
)
