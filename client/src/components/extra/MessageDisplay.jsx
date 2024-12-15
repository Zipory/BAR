import React, { useState, useEffect } from "react";
import "../../style/MessageOverlay.css"; // Optional CSS for styling

const MessageOverlay = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (!isVisible) return null;

  return <div className="message-overlay">{message}</div>;
};

export default MessageOverlay;

// Usage Example
// import MessageOverlay from './MessageOverlay';
// <MessageOverlay message="This is a message!" />
