import React, { useEffect } from 'react';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import styled from 'styled-components';
import awsExports from '../aws-exports';
import { useNavigate } from 'react-router-dom'; // For navigation
import './SignInPage.css';

Amplify.configure(awsExports);

// Styled components
const CustomButton = styled(Button)`
  background-color: #007bff;
  color: red;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CustomAuthenticator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 400px;  /* Ensures the container doesn't stretch too much on larger screens */

  @media (min-width: 768px) {
    max-width: 600px;  /* Adjust width for tablet and larger screens */
  }

  @media (min-width: 1024px) {
    max-width: 800px;  /* Further adjust width for desktop screens */
  }
`;

function SignInPage() {
    console.log("VES")
  const navigate = useNavigate();

  return (
    <div className="sign-in-container">
        <h1>Custom Sign-In Page</h1>
      <Authenticator
        hideSignUp={false}
        components={{
          Button: CustomButton,
          SignIn: {
            Header: () => <h1>Sig In</h1>,
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
  );
}

export default SignInPage;
