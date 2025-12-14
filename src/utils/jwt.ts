interface JwtPayload {
  uid: string;
  role: string;
  iat: number;
  exp: number;
}

export const decodeJWT = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const getCurrentUserUid = (): string | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  
  const payload = decodeJWT(token);
  return payload?.uid || null;
};
