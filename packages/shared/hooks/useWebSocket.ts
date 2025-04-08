import { WEB_SOCKET_CONFIG } from '@game-portal/constants/brands';
import { useEffect } from 'react';

export const useWebSocket = () => {
  useEffect(() => {
    let ws: WebSocket | null = null;
    let retryTimeout: number;
    let retryCount = 0;
    const maxRetries = WEB_SOCKET_CONFIG.options.maxReconnectAttempts;

    const connect = () => {
      ws = new WebSocket(WEB_SOCKET_CONFIG.url, WEB_SOCKET_CONFIG.protocols);

      ws.onopen = () => {
        console.log('WebSocket connection established');
        // Reset retry count on successful connection.
        retryCount = 0;
        // Send a subscription message.
        ws?.send(JSON.stringify({ type: 'subscribe', channel: 'gameUpdates' }));
      };

      ws.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.warn(`WebSocket closed: [${event.code}] ${event.reason}`);

        if (WEB_SOCKET_CONFIG.options.reconnect === false) return;

        // Only reconnect if the closure was unexpected (code !== 1000)
        if (event.code !== 1000 && retryCount < maxRetries) {
          retryCount++;
          // Exponential backoff with a maximum delay of 30 seconds.
          const retryDelay = Math.min(
            WEB_SOCKET_CONFIG.options.reconnectInterval * 2 ** retryCount,
            30000,
          );
          console.log(
            `Attempting reconnect in ${retryDelay} ms (retry #${retryCount})`,
          );
          retryTimeout = window.setTimeout(() => {
            connect();
          }, retryDelay);
        }
      };
    };

    // Initial connection.
    connect();

    // Clean up on unmount.
    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (ws) {
        // Close the websocket with a normal closure code (1000)
        ws.close(1000, 'Component unmounted');
      }
    };
  }, []);
};
