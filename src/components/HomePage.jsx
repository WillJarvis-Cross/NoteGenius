import React, { useEffect, useState } from 'react'
import { Button, withAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import styled from 'styled-components'
import awsExports from '../aws-exports'
import { signOut } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

Amplify.configure(awsExports)

const CustomButton = styled(Button)`
  background-color: #007bff
  color: #0000ff
  border-radius: 4px
  padding: 10px 20px
  font-size: 16px

  &:hover {
    background-color: #0056b3
  }
`

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        //await currentAuthenticatedUser()
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error checking authentication state:', error)
        setIsAuthenticated(false)
        navigate('/signin') // Redirect to sign-in page if not authenticated
      }
    }

    checkAuthState()
  }, [navigate])

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!isAuthenticated) {
    return null // or you can render a loading spinner or message
  }

  return (
    <div className='outerContainer'>
      <div className='container'>
        <h1 className='welcomeMessage'>Welcome to the Homepage!</h1>
        <CustomButton onClick={handleSignOut}>Sign Out</CustomButton>
      </div>
    </div>
  )
}

export default withAuthenticator(HomePage)
