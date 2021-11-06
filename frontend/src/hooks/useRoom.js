/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { createSocket } from "../services/socket";

export function useRoom() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket === null) {
      setSocket(createSocket());
    }
  }, [socket]);
  
  return {}
}