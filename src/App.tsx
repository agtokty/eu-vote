import React, { useEffect, useState } from 'react';
import { UserProvider } from './context/UserContext';
import AppRoutes from './AppRoutes';

function App() {


  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // setCurrentUser(null)
  }, []);


  return (
    <React.Fragment>
      <UserProvider user={currentUser}>
        <AppRoutes />
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
