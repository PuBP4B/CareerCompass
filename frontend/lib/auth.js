// frontend/lib/auth.js
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    // แจ้งให้ส่วนอื่นรู้ว่า auth เปลี่ยนแล้ว
    window.dispatchEvent(new Event('auth-changed'));
  }
}
export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-changed'));
  }
}

export async function fetchMe() {
  const t = getToken();
  if (!t) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
    headers: { Authorization: `Bearer ${t}` },
    cache: 'no-store', // กัน cache เดิม
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.user || null;
}
