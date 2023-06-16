import { useState } from "react";
import LoggedIn from "./Components/LoggedIn/LoggedIn";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Helmet } from 'react-helmet';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <>
        <Helmet>
          <title>Imara Health | Log In</title>
        </Helmet>
        {isLoggedIn ? (
          <LoggedIn setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </>
  );
}

export default LoginPage;