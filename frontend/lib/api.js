export const API = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';
export function authHeader() {
  if (typeof window === 'undefined') return {};
  const t = localStorage.getItem('token');
  return t ? { Authorization: `Bearer ${t}` } : {};
}
export async function api(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      ...(options.headers || {}),
    },
    ...options,
  });
  return res.json();
}
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
export function setToken(token) {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
}
export function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}
export async function fetchMe() {
  const t = getToken();
  if (!t) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
    headers: { Authorization: `Bearer ${t}` },
  });
  const data = await res.json();
  return data?.user || null;
}
