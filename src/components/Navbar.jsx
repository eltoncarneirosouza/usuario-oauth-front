import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/home" className="mr-4">Home</Link>
        <Link to="/clients">Clientes</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
        Sair
      </button>
    </nav>
  );
}

export default Navbar;
