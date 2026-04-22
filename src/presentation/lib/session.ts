'use client';

const SESSION_KEY = 'trux.front.session';

export function saveFrontendSession(email: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SESSION_KEY, email);
}

export function clearFrontendSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function readFrontendSession() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(SESSION_KEY);
}
