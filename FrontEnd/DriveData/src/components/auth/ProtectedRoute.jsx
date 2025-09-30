// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
 
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
 
  useEffect(() => {
    // Consulta no backend se a sessão está ativa
    fetch("http://localhost:3000/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated); // backend deve retornar { authenticated: true/false }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);
 
  if (isAuthenticated === null) {
    return <p>Carregando...</p>; // Evita piscar tela
  }
 
  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // redireciona se não logado
  }
 
  return children;
};
 
export default ProtectedRoute;