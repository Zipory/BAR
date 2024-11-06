import { useEffect } from "react";

function useUserEffect(user, navigate) {
  useEffect(() => {
    // Your effect logic here
    console.log("User has changed:", user);
    if (user !== null) navigate("/events-manager");
    // This effect will run only when 'user' changes
  }, [user]);
}

export default useUserEffect;
