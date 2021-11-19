import React from "react";
import { RealmAppProvider } from "./RealmApp";

const APP_ID = process.env.REACT_APP_REALMAPP;

const App = () => {
  return (
    <RealmAppProvider appId={APP_ID}>
      <div>Hello World</div>
    </RealmAppProvider>

  )
}

export default App;