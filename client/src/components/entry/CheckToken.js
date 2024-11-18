/**return true is there is a token bar and status is waiter in the LS, or false.  */
export default function CheckToken() {
  
  // const navigate = useNavigate();
  let token = getToken();
  // useEffect(() => {
    
    //   if (!token[0] || !(typeof token[1] === "boolean")) {
      //     navigate("/home");
      //   } else {
        //     FetchToken(serverUrl, token, setUser);
        //     setIsOk(true);
        //   }
        // }, []);
        if (!token[0] || !(typeof token[1] === "boolean")) {
          return false;
        }
        return true;
      }
      
      export const getToken = () => {
         let bar = window.localStorage.getItem("bar");
         let isAwaiter = window.localStorage.getItem("isWaiter");
         return [bar, JSON.parse(isAwaiter)];
       };