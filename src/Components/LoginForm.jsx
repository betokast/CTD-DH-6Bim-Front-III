import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth"
import { useTheme } from '../hooks/useTheme'

import styles from "./Form.module.css";

const LoginForm = () => {

  const { theme } = useTheme()
  const { saveToken } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState({usernameError: false, passwordError: false, genericError: false})

  const navigate = useNavigate()

  const usernameValidation = (username) => {
    setFormError(prevState => ({...prevState, genericError: false}))

    const withoutSpaces = username.trim()

    if (withoutSpaces.length >= 8) {

      setFormError(prevState => ({...prevState, usernameError: false}))
      setUsername(username)
      return true

    } else {

      setFormError(prevState => ({...prevState, usernameError: true}))
      return false

    }
  }

  const passwordValidation = (password) => {
    setFormError(prevState => ({...prevState, genericError: false}))

    if (password.length >= 8) {

      setFormError(prevState => ({...prevState, passwordError: false}))
      setPassword(password)
      return true

    } else {

      setFormError(prevState => ({...prevState, passwordError: true}))
      return false

    }

  }

  const handleSubmit = (event) => {

    event.preventDefault()

    let signInData = {
      "username": username,
      "password": password
    }

    let requestHeaders = {
      'Content-Type': 'application/json'
    }

    let requestConfiguration = {
      method: 'POST',
      body: JSON.stringify(signInData),
      headers: requestHeaders
    }

    if(usernameValidation && passwordValidation) {

      fetch(`https://dhodonto.ctdprojetos.com.br/auth`, requestConfiguration).then(
        res => {
          if(res.ok) {
            res.json().then(
              data => {

                saveToken(data.token)
                alert('Login efetuado!')
                navigate('/home')
              }
            )
          } else {
            setFormError({usernameError: false, passwordError: false, genericError: true})
            alert('Usuário ou senha incorreto')
          }
        }
      )
    }
  }

  return (
    <>

      <div
        className={`text-center card container ${styles.card} ${theme === 'dark' ? `${styles.cardDark}` : ''} ${formError.genericError ? `${styles.formError}` : ''}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing} ${formError.usernameError ? `${styles.formError}` : ''}`}
              placeholder="Login"
              name="login"
              required
              onChange={(event) => usernameValidation(event.target.value)}
            />

            {
              formError.usernameError &&
              <span className={`${styles.formError}`}>O nome de usuário deve conter pelo menos 8 caracteres</span>
            }

            <input
              className={`form-control ${styles.inputSpacing} ${formError.passwordError ? `${styles.formError}` : ''}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              onChange={(event) => passwordValidation(event.target.value)}
            />

            {
              formError.passwordError &&
              <span className={`${styles.formError}`}>A senha deve conter pelo menos 8 caracteres</span>
            }

            <button className={`btn btn-primary`} type="submit" onClick={(event) => handleSubmit(event)}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;