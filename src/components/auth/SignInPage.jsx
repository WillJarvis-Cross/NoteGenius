import React, { useEffect, useState } from 'react';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import styled from 'styled-components';
import awsExports from '../../aws-exports';
import './SignInPage.css';
//import { getFileUrl } from '../utils/storageService'

Amplify.configure(awsExports);

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
`;
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

  const logoUrl =
    'https://notegenius-bucket7e1f8-notegen.s3.amazonaws.com/logo-color2.png';
  return (
    <div className="sign-in-container">
      <Authenticator
        hideSignUp={false}
        components={{
          Button: CustomButton,
          SignIn: {
            Header: () => (
              <div className="header-container">
                <img src={logoUrl} alt="Logo" className="logo-image" />
              </div>
            ),
          },
          SignUp: {
            Header: () => (
              <div className="header-container">
                <img src={logoUrl} alt="Logo" className="logo-image" />
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
  );
}

export default SignInPage;
