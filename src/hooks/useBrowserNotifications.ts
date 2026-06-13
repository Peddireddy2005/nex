import { useState, useEffect, useCallback } from 'react';

export const useBrowserNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'denied' as NotificationPermission;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    if (document.hasFocus()) return; // Don't notify if app is focused

    const notification = new Notification(title, {
      icon: '/placeholder.svg',
      badge: '/placeholder.svg',
      ...options,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000);
  }, []);

  return { permission, requestPermission, sendNotification };
};
