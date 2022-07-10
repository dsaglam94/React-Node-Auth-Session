import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, user } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-black/70 flex items-center justify-center">
      <div className="border-2 border-black/50 p-10 rounded-md shadow-2xl">
        <form
          onSubmit={(e) => signUp(e, userName, email, password, fullName)}
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
              className="p-2 rounded-md bg-black/80 placeholder:text-gray-300 text-white"
              type="text"
              id="user_name"
              placeholder="Enter your user name"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-bold text-white tracking-wide"
              htmlFor="full_name"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              className="p-2 rounded-md bg-black/80 placeholder:text-gray-300 text-white"
              type="text"
              id="full_name"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-bold text-white tracking-wide"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-black/80 placeholder:text-gray-300 text-white"
              type="email"
              id="email"
              placeholder="Enter your email"
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
              className="p-2 rounded-md bg-black/80 placeholder:text-gray-300 text-white"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full bg-green-600 text-center py-2 rounded-md font-bold text-white">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
