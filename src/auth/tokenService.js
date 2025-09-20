
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
  return !!getAccessToken();
}
