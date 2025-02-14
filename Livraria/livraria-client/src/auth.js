export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  return token !== null;
}

export function getToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  
  try {
    return JSON.parse(token);
  } catch (error) {
 
    return token;
  }
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userBalance");
  localStorage.removeItem("userId");
}
