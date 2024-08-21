import React from 'react'
import { Authenticator, Button } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import styled from 'styled-components'
import awsExports from '../aws-exports'
import './SignInPage.css'

Amplify.configure(awsExports)

// Styled components
const CustomButton = styled(Button)`
  background-color: #007bff
  color: red
  border-radius: 4px
  padding: 10px 20px
  font-size: 16px

  &:hover {
    background-color: #0056b3
  }
`

function SignInPage() {

  return (
    <div className="sign-in-container">
      <Authenticator
        hideSignUp={false}
        components={{
          Button: CustomButton,
          SignIn: {
            Header: () => <h1>Sign In</h1>,
          },
          SignUp: {
            Header: () => <h1>Sign Up</h1>,
          },
        }}
      >
        {({ signOut, user }) => (
          <div>
            <h1>Welcome, {user ? user.username : 'Guest'}</h1>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        )}
      </Authenticator>
    </div>
  )
}

export default SignInPage
