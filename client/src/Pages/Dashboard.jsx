import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.role !== "admin") {
        navigate("/");
      }
    }, 50);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div>
      {user.role === undefined ? (
        <div>loading...</div>
      ) : user.role === "admin" ? (
        <div className="w-full min-h-screen bg-black/70 flex items-center justify-center">
          <h1 className="font-bold text-4xl text-white tracking-wider">
            Admin Dashboard
          </h1>
        </div>
      ) : (
        <div>Not allowed</div>
      )}
    </div>
  );
};

export default Dashboard;
