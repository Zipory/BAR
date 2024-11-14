import { useEffect, useContext } from "react";
import { typeOfUser } from "../App";
function useUserEffect(state, navigate, navTo) {
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  useEffect(() => {
  
    console.log("State has changed:", state);
    if (state !== null && state !== false) {
      isAwaiter === true ?  navigate(navTo.waiter) :  navigate(navTo.manager);

      // navigate(navTo);
    // This effect will run only when 'state' changes
    }
  }, [state]);
}

export default useUserEffect;
