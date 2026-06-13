// Pure helpers for device session policy.
// Used by DashboardLayout for enforcement and tested in isolation.

export type SessionRow = {
  id: string;
  user_id: string;
  session_id: string;
  device_info: string | null;
  last_active_at: string;
};

export type PolicyInput = {
  sessions: SessionRow[];
  currentSessionId: string;
  currentDeviceInfo: string | null;
  allowMulti: boolean;
};

export type PolicyResult = {
  keep: SessionRow[];
  remove: SessionRow[];
};

/**
 * Compute which sessions should remain and which should be revoked.
 *
 * Rules:
 * - Always keep the current session (matched by session_id).
 * - When allowMulti is false: keep only the current session — every other
 *   session for this user is revoked (strict single-device).
 * - When allowMulti is true: keep one session per distinct device_info,
 *   preferring the most recently active one. The current session is always
 *   preferred for its own device. This still prevents duplicate sessions
 *   from the same device while permitting multiple distinct devices.
 */
export function applySessionPolicy({
  sessions,
  currentSessionId,
  currentDeviceInfo,
  allowMulti,
}: PolicyInput): PolicyResult {
  if (!allowMulti) {
    const keep: SessionRow[] = [];
    const remove: SessionRow[] = [];
    for (const s of sessions) {
      (s.session_id === currentSessionId ? keep : remove).push(s);
    }
    return { keep, remove };
  }

  // Group by device_info. Null/empty device info is bucketed as 'unknown'.
  const byDevice = new Map<string, SessionRow[]>();
  for (const s of sessions) {
    const key = (s.device_info || 'unknown').trim() || 'unknown';
    const arr = byDevice.get(key) ?? [];
    arr.push(s);
    byDevice.set(key, arr);
  }

  const keep: SessionRow[] = [];
  const remove: SessionRow[] = [];
  const currentKey = (currentDeviceInfo || 'unknown').trim() || 'unknown';

  for (const [key, group] of byDevice.entries()) {
    // Prefer the current session for its device; otherwise the most recent.
    let winner: SessionRow | undefined;
    if (key === currentKey) {
      winner = group.find(s => s.session_id === currentSessionId);
    }
    if (!winner) {
      winner = [...group].sort(
        (a, b) => new Date(b.last_active_at).getTime() - new Date(a.last_active_at).getTime()
      )[0];
    }
    for (const s of group) {
      if (s === winner) keep.push(s);
      else remove.push(s);
    }
  }

  return { keep, remove };
}
