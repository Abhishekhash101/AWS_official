// ── Auth helpers used across the app ──────────────────────────

const API_URL = import.meta.env.VITE_API_URL || '';

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/** Submit a quiz score. Returns { ok, error } */
export async function submitScore({ quizId, quizTitle, quizType, score, total, timeTaken }) {
  const token = getToken();
  if (!token) return { ok: false, error: 'Not logged in' };
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`${API_URL}/api/quiz-scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ quizId, quizTitle, quizType, score, total, timeTaken }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    const data = await res.json();
    return res.ok ? { ok: true, data } : { ok: false, error: data.error };
  } catch (e) {
    return { ok: false, error: e.name === 'AbortError' ? 'Request timed out' : 'Network error' };
  }
}

/** Fetch my quiz scores */
export async function fetchMyScores() {
  const token = getToken();
  if (!token) return [];
  try {
    const res = await fetch(`${API_URL}/api/quiz-scores/me?t=${Date.now()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

/** Fetch qualification round status */
export async function fetchRoundStatus() {
  const token = getToken();
  if (!token) return {};
  try {
    const res = await fetch(`${API_URL}/api/quiz-scores/round-status?t=${Date.now()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });
    return res.ok ? res.json() : {};
  } catch { return {}; }
}

/** Fetch admin token */
export async function adminLogin(adminId, password) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, password }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    const data = await res.json();
    if (res.ok) return { ok: true, token: data.token };
    return { ok: false, error: data.error || `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e.name === 'AbortError' ? 'Backend not reachable (timeout)' : `Network error: ${e.message}` };
  }
}

/** Fetch all scores (admin) */
export async function fetchAdminScores(adminToken) {
  try {
    const res = await fetch(`${API_URL}/api/admin/scores`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

/** Fetch stats (admin) */
export async function fetchAdminStats(adminToken) {
  try {
    const res = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    return res.ok ? res.json() : {};
  } catch { return {}; }
}

/** Check backend health */
export async function checkHealth() {
  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`${API_URL}/api/health`, { signal: ctrl.signal });
    return res.ok ? res.json() : { status: 'error' };
  } catch {
    return { status: 'error', backend: 'unreachable' };
  }
}

/** Update user profile */
export async function updateProfile(firstName, lastName) {
  const token = getToken();
  if (!token) return { ok: false, error: 'Not logged in' };
  try {
    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ firstName, lastName }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      return { ok: true, user: data.user };
    }
    return { ok: false, error: data.error };
  } catch { return { ok: false, error: 'Network error' }; }
}

/** Update user password */
export async function updatePassword(oldPassword, newPassword) {
  const token = getToken();
  if (!token) return { ok: false, error: 'Not logged in' };
  try {
    const res = await fetch(`${API_URL}/api/user/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    return res.ok ? { ok: true } : { ok: false, error: data.error };
  } catch { return { ok: false, error: 'Network error' }; }
}

/** Get Global Quiz Status */
export async function fetchQuizStatus() {
  try {
    const res = await fetch(`${API_URL}/api/quiz-status`, { cache: 'no-store' });
    const data = await res.json();
    return res.ok ? data.status : 'inactive';
  } catch { return 'inactive'; }
}

/** Set Global Quiz Status (Admin) */
export async function updateQuizStatus(adminToken, action) {
  try {
    const res = await fetch(`${API_URL}/api/admin/quiz-control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ action })
    });
    const data = await res.json();
    return res.ok ? { ok: true, status: data.status } : { ok: false, error: data.error };
  } catch { return { ok: false, error: 'Network error' }; }
}

