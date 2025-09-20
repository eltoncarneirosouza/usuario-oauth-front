import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bem-vindo ao sistema!</h1>
        <p className="mt-2">Você está autenticado.</p>
      </div>
    </div>
  );
}

export default Home;
