import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cliente from "./pages/Cliente";

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cliente/novo"
            element={
              <PrivateRoute>
                <Cliente />
              </PrivateRoute>
            }
          />
          {/* rota padrão redireciona */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;