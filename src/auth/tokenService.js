
export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setTokens({ accessToken, refreshToken }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function isAuthenticated() {
  const token = getAccessToken();
  if (!token) return false;

  try {
    // Verifica se o token é um JWT válido
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Converte para milissegundos
    
    // Verifica se o token não está expirado
    if (Date.now() >= expiry) {
      clearTokens();
      return false;
    }
    
    return true;
  } catch (error) {
    clearTokens();
    return false;
  }
}
