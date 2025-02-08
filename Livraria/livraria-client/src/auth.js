// auth.js

// Verifica se há um token salvo no localStorage
export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  return token !== null;
}

// Retorna o token salvo (se estiver salvo como JSON, o parse é necessário)
export function getToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  
  try {
    return JSON.parse(token);
  } catch (error) {
    // Se não for um JSON válido, retorna como string mesmo
    return token;
  }
}

// Remove o token (realiza o logout)
export function logout() {
  localStorage.removeItem("authToken");
}
