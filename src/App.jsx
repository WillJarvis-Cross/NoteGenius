/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import Homepage from './components/Homepage';
import { withAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  console.log('App component rendered');
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Homepage />} /> 
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App, {
  components: {
    SignIn: SignInPage,
  },
});
*/
// App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Import the styles for the Authenticator component

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
  );
};

const AuthenticatedRoute = () => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  if (authStatus === 'authenticated') {
    return <HomePage />;
  } else {
    return <SignInPage />;
  }
};

export default App;

