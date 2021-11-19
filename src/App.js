import React from "react";
import { RealmAppProvider, useRealmApp } from "./RealmApp";

import LoginScreen from "./Containers/LoginScreen";
import HelloWorld from "./Containers/Welcome";

const APP_ID = process.env.REACT_APP_REALMAPP;

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <LoginScreen />;
};

const App = () => {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <HelloWorld />
      </RequireLoggedInUser>
    </RealmAppProvider>

  )
}

export default App;