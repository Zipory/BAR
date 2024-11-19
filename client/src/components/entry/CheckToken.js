/**return true is there is a token bar and status is waiter in the LS, or false.  */
export function CheckToken() {
  let token = getToken();
  if (!token[0] || !(typeof token[1] === "boolean")) {
    return false;
  }
  return true;
}
/**return from LS array of two: [0]= the token, [1]= is_waiter. */
export const getToken = () => {
  let bar = window.localStorage.getItem("bar");
  let isAwaiter = window.localStorage.getItem("isWaiter");
  return [bar, JSON.parse(isAwaiter)];
};
