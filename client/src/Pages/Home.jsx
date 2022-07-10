import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { signOut, user } = UserAuth();
  console.log(user);

  return (
    <div className="bg-black/70 w-full min-h-screen text-white flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl">Welcome to the Homepage</h1>
      <div className="w-[500px] h-[200px] border-2 border-gray-400 rounded-md flex items-center justify-center px-10 shadow-2xl">
        <p className="text-3xl text-center leading-10">
          This page is available for all the users. No need to sign in.
        </p>
      </div>
      <div className="space-x-6">
        {user.loggedIn ? (
          <Link to="/account">
            <a className="text-green-600 border-2 border-green-600 px-6 py-2 rounded-md shadow-xl">
              Account
            </a>
          </Link>
        ) : (
          <Link to="/signin">
            <a className="text-green-600 border-2 border-green-600 px-6 py-2 rounded-md shadow-xl">
              Sign In
            </a>
          </Link>
        )}
        {user.loggedIn ? (
          <button
            onClick={signOut}
            className="bg-green-600 px-6 py-2 rounded-md shadow-xl"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signup">
            <a className="bg-green-600 px-6 py-2 rounded-md shadow-xl">
              Sign Up
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
