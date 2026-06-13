import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Warns the user when they try to leave (close tab / refresh) while changes
 * are unsaved, and intercepts in-app SPA navigation by patching the History API.
 *
 * Returns:
 *  - pendingNavigate: a callback to confirm/cancel an intercepted SPA nav
 *  - pendingHref: the URL the user tried to go to (or null)
 *  - cancelPending: drop the pending navigation
 *  - guardedRun: helper to wrap an arbitrary action behind the guard
 */
export function useUnsavedGuard(dirty: boolean) {
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Browser close / refresh
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  // Patch history.pushState / replaceState + popstate to intercept SPA nav
  useEffect(() => {
    const origPush = window.history.pushState.bind(window.history);
    const origReplace = window.history.replaceState.bind(window.history);

    const intercept = (orig: typeof origPush) =>
      function (this: History, ...args: Parameters<typeof origPush>) {
        const url = args[2];
        if (dirtyRef.current && url && typeof url === 'string') {
          setPendingHref(url);
          setPendingAction(() => () => orig(...args));
          return;
        }
        return orig(...args);
      };

    window.history.pushState = intercept(origPush) as typeof origPush;
    window.history.replaceState = intercept(origReplace) as typeof origReplace;

    return () => {
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
    };
  }, []);

  const confirmPending = useCallback(() => {
    pendingAction?.();
    setPendingAction(null);
    setPendingHref(null);
    // dispatch popstate so React Router picks up the change
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [pendingAction]);

  const cancelPending = useCallback(() => {
    setPendingAction(null);
    setPendingHref(null);
  }, []);

  const guardedRun = useCallback((action: () => void) => {
    if (dirtyRef.current) {
      setPendingHref('this action');
      setPendingAction(() => action);
    } else {
      action();
    }
  }, []);

  return { pendingHref, confirmPending, cancelPending, guardedRun };
}
