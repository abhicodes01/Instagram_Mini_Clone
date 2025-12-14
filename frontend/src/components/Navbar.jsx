import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b px-6 py-3 flex justify-between items-center bg-white">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        MiniInstagram
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/create" className="text-sm font-medium">
              Create
            </Link>

            <Link
              to={`/profile/${user.id}`}
              className="text-sm font-medium"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm">
              Login
            </Link>
            <Link to="/signup" className="text-sm">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
