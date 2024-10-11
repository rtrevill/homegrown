import { useState, useEffect } from "react";
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from "./pages/Login";

import auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
  
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // headers: {"Content-Type": "application/json"},
  cache: new InMemoryCache(),
});


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.loggedIn());
  const [user, setUser] = useState({}); // to pass basic user information to navbar

  useEffect(() => {
    // Update isLoggedIn when AuthService changes
    const checkLoginStatus = () => {
      setIsLoggedIn(auth.loggedIn());
      if (auth.loggedIn()) {
        // If logged in, get user profile and set user state to pass to navbar
        const profile = auth.getProfile();
        setUser(profile.data); // jwt decoding is returning an object with a data property
      }
    };

    // call checkLoginStatus when component mounts to get profile of logged in user
    checkLoginStatus();

    // add event listener to checkLoginStatus when localStorage changes
    window.addEventListener("storage", checkLoginStatus);

    // cleanup function to remove event listener
    //https://stackoverflow.com/questions/55360736/how-do-i-window-removeeventlistener-using-react-useeffect
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);


  
  return (
    <ApolloProvider client={client}>
      { isLoggedIn ? (
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
      ) : (
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Login />
        </div>

      )
      }
    </ApolloProvider>
  );
}

export default App;
