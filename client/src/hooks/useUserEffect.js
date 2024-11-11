import { useEffect } from "react";

function useUserEffect(state, navigate, navTo) {
  useEffect(() => {
  
    console.log("State has changed:", state);
    if (state !== null && state !== false) navigate(navTo);
    // This effect will run only when 'state' changes
    
  }, [state]);
}

export default useUserEffect;
