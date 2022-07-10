import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: null });
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  async function fetchUserCredentials() {
    try {
      const res = await fetch("http://localhost:3001/login", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUser({ ...data });
    } catch (error) {
      console.log("something happened while fetching login credentials");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserCredentials();
  }, [user?.email]);

  const signUp = async (e, userName, email, password, fullName) => {
    e.preventDefault();
    try {
      let res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          user_name: userName,
        }),
      });
      let data = await res.json();
      console.log(data);
      if (data.loggedIn) {
        setUser({ ...data });
        navigate("/account");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("client-side error happened");
    }
  };

  const signIn = async (e, userName, password) => {
    e.preventDefault();
    try {
      let res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          user_name: userName,
        }),
      });
      let data = await res.json();
      console.log(data);

      if (data.loggedIn) {
        setUser({ ...data });
        navigate("/account");
      } else {
        setErrorMessage((prevValue) => !prevValue);
      }
    } catch (error) {
      console.log(error);
      console.log("client-side error happened");
    }
  };

  const signOut = async () => {
    const res = await fetch("http://localhost:3001/logout", {
      credentials: "include",
    });
    const data = res.json();
    console.log(data);

    setUser({ ...data, loggedIn: false });
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, user, setUser, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
