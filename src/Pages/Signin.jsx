import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, errorMessage, user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/account");
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-black/70 flex items-center justify-center">
      <div className="border-2 border-black/50 p-10 rounded-md shadow-2xl">
        <div className={errorMessage ? "w-full" : "hidden"}>
          <span className="bg-red-400 py-1 px-3 text-gray-200 inline-block mb-4 rounded-md">
            Wrong User Name or Password
          </span>
        </div>
        <form
          onSubmit={(e) => signIn(e, userName, password)}
          className="space-y-6"
        >
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-bold text-white tracking-wide"
              htmlFor="user_name"
            >
              User Name
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 rounded-md bg-black/80 placeholder:text-gray-300 text-white"
              type="text"
              id="user_name"
              placeholder="Enter your user name"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label
              className="font-bold text-white tracking-wide"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md bg-black/80 placeholder:text-gray-300 text-white"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full bg-green-600 text-center py-2 rounded-md font-bold text-white">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
