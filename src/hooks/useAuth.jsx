import { useState, createContext, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider(props) {
  const authLocalStorage = localStorage.getItem('auth')

  const [auth, setAuth] = useState(
    authLocalStorage === null ? '' : authLocalStorage
  )

  function saveToken(tokenReceived) {
    if (tokenReceived !== auth) {
      setAuth(tokenReceived)
      localStorage.setItem('auth', tokenReceived)
    }
  }

  function removeToken() {
    setAuth('')
    localStorage.removeItem('auth')
    alert("Usuário desconectado")
  }

  return (
    <AuthContext.Provider value={{ auth, saveToken, removeToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}