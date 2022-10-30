import { createContext, ReactNode, useContext, useState } from 'react'

type User = {
  name: string
  photoUrl: string
  id: string
}

type UserContextValue = {
  user: User
  setUser: (user: User) => void
}

const UserContext = createContext({} as UserContextValue)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: `User-${Math.ceil(Math.random() * 100)}`,
    photoUrl: 'https://media.tenor.com/DuThn51FjPcAAAAC/nerd-emoji-nerd.gif',
    id: `${Math.random() ** 2}-${Math.random() ** 2}`,
  })

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
