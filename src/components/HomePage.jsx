import React, { useEffect, useState } from 'react';
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import styled from 'styled-components';
import awsExports from '../aws-exports';
import { signOut } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

Amplify.configure(awsExports);

const WelcomeMessage = styled.h1`
  color: #333;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const CustomButton = styled(Button)`
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

function HomePage() {
    console.log("VES")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        //await currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking authentication state:', error);
        setIsAuthenticated(false);
        navigate('/signin'); // Redirect to sign-in page if not authenticated
      }
    };

    checkAuthState();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isAuthenticated) {
    return null; // or you can render a loading spinner or message
  }

  return (
    <Container>
      <WelcomeMessage>Welcome to the Homepage!</WelcomeMessage>
      <CustomButton onClick={handleSignOut}>Sign Out</CustomButton>
    </Container>
  );
}

export default withAuthenticator(HomePage);
