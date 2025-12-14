import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { searchUsers } from "../api/user.api";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const res = await searchUsers(value);
    setResults(res.data);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b px-6 py-3 flex justify-between items-center bg-white relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        MiniInstagram
      </Link>

      {/* Search */}
      {user && (
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            className="w-full border rounded px-3 py-1 text-sm"
          />

          {results.length > 0 && (
            <div className="absolute top-9 w-full bg-white border rounded shadow z-10">
              {results.map((u) => (
                <div
                  key={u._id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    navigate(`/profile/${u._id}`);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  {u.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/create">Create</Link>
            <Link to={`/profile/${user.id}`}>Profile</Link>
            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
