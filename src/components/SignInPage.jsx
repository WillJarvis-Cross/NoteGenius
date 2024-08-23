import React, { useEffect } from 'react'
import { Authenticator, Button } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import styled from 'styled-components'
import awsExports from '../aws-exports'
import './SignInPage.css'
//import { getFileUrl } from '../utils/storageService'

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
const Logo = styled.img`
  width: 150px; // Adjust the size of the logo
  margin-bottom: 20px;
`;

function SignInPage() {
  /*const [logoUrl, setLogoUrl] = useState(null)

  useEffect(() => {
    async function fetchLogo() {
      const url = await getFileUrl('logo-color.png')
      setLogoUrl(url)
    }

    fetchLogo()
  }, [])*/

  // this line should go in header: {logoUrl && <Logo src={logoUrl} alt="Logo" />}

  return (
    <div className="sign-in-container">
      <Authenticator
        hideSignUp={false}
        components={{
          Button: CustomButton,
          SignIn: {
            Header: () => (
              <div>
                
                <h1>Sign In</h1>
              </div>
            ),
          },
          SignUp: {
            Header: () => (
              <div>
                
                <h1>Sign Up</h1>
              </div>
            ),
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
