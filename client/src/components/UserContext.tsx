import { createContext, ReactNode, useContext, useState } from 'react'

type UserContextValue = {
  url: string
  setUrl: (url: string) => void
  setName: (name: string) => void
  name: string
}

const UserContext = createContext({} as UserContextValue)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState(
    () => `User-${Math.ceil(Math.random() * 100)}`
  )
  const [url, setUrl] = useState(
    'https://media.tenor.com/DuThn51FjPcAAAAC/nerd-emoji-nerd.gif'
  )

  return (
    <UserContext.Provider
      value={{
        url,
        setUrl,
        name,
        setName,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
