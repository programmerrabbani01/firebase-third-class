import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth.js";

const Home = ({ loggedIn }) => {
  const handleUserLogOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div className="max-w-lg p-10 mx-auto mt-10 bg-white">
        {loggedIn ? (
          <div className="">
            <img
              className="w-[300px] h-[300px] object-cover overflow-hidden"
              src={loggedIn.photoURL}
              alt=""
            />
            <h2>{loggedIn.displayName}</h2>
            <h3>{loggedIn.email}</h3>
            <button
              className="p-2 text-white bg-blue-600"
              onClick={handleUserLogOut}
            >
              Log Out
            </button>
          </div>
        ) : (
          <h1>Log in to view</h1>
        )}
      </div>
    </>
  );
};

export default Home;
