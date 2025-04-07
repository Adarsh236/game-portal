import { useEffect } from "react";

export const useWebSocket = () => {
  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.org");
    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send(JSON.stringify({ type: "subscribe", channel: "gameUpdates" }));
    };
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    return () => {
      ws.close();
    };
  }, []);
};
