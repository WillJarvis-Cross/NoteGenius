import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignInPage from './components/auth/SignInPage'
import HomePage from './components/home/HomePage'
import { Authenticator } from '@aws-amplify/ui-react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css' // Import the styles for the Authenticator component

const App = () => {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<AuthenticatedRoute />} />
          <Route path="/" element={<AuthenticatedRoute />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  )
}

const AuthenticatedRoute = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])

  if (authStatus === 'authenticated') {
    return <HomePage />
  } else {
    return <SignInPage />
  }
}

export default App
