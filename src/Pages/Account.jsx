import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { signOut, user } = UserAuth();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <div className="bg-black/70 w-full min-h-screen flex flex-col items-center justify-start p-20">
      <div className="bg-gray-500 rounded-md p-10 text-white flex flex-col items-center gap-5 shadow-2xl">
        <h1 className="font-bold text-3xl">Welcome {user.name}</h1>
        <span className="text-xl">{user.email}</span>
        <div className="flex items-center w-full justify-start gap-3">
          <h2 className="">User Type:</h2>
          <p className="text-orange-500 capitalize">{user.role} user</p>
        </div>
        <button
          onClick={signOut}
          className="w-full bg-green-600 py-2 rounded-md"
        >
          Sign Out
        </button>
      </div>
      <div className="bg-gray-500 rounded-md p-10 mt-20 shadow-2xl space-y-10">
        <h3 className="text-white font-bold text-3xl text-center capitalize">
          {user.name}'s Posts
        </h3>
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-bold">title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              facilis voluptas inventore exercitationem eveniet aut eaque rerum
              facere ex repudiandae!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-bold">title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              facilis voluptas inventore exercitationem eveniet aut eaque rerum
              facere ex repudiandae!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-bold">title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              facilis voluptas inventore exercitationem eveniet aut eaque rerum
              facere ex repudiandae!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
