/**get the token of the user. */
import { getToken } from "./entry/CheckToken";

/**get the server-host from the .env file */
const server = process.env.REACT_APP_SERVER;

/**--Fetch send token in header,
 * and set the state with the data respons-- */
export async function FetchToken(url, setState) {
  let [token, isWaiter] = getToken();
  let realUrl = `${server}${url}`;
  console.log("welcom to FetchToken");
  fetch(realUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
      isAwaiter: isWaiter,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json?.succeed) {
        setState(json.data);
      }
      // console.log("json:", json);
    });
}

/**----------Fetch post for register/login---------------- */
export async function FetchPost(url, data, setState) {
  let realUrl = server + url;
  console.log("welcom to FetchPost");
  console.log(35, "data:", data);
  console.log(36, "url:", url);
  console.log(37, "realurl:", realUrl);
  // console.log(84, "email:", data.email);

  fetch(realUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: data["email"],
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log(93, "post created");

        return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        // console.log("json:", json);
        if (setState) {
          setState(json.data ?? "nav to login");
          if (json.data?.token) {
            window.localStorage.setItem("bar", json.data.token);
            window.localStorage.setItem(
              "isWaiter",
              JSON.stringify(data.isAwaiter)
            );
          }
          return json;
        } else {
          console.log("There is no setState");
        }
      }
    });
}

/**----------Fetch post for new event -------------- */
export async function FetchNewEvent(url, data, setState) {
  let realUrl = server + url;
  console.log("welcom to FetchNewEvent");
  let [token, isWaiter] = getToken();
  fetch(realUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      isAwaiter: isWaiter,
      authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log(135, "post created");

        return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      // console.log("json:", json);
      if (setState) {
        setState(json); //   check tommorow
        // if (json.data?.token) {
        //   window.localStorage.setItem("bar", json.data.token);
        //   window.localStorage.setItem(
        //     "isWaiter",
        //     JSON.stringify(data.isAwaiter)
        //   );
      }
      // } else {
      //   console.log("There is no setState");
      // }
      return json;
    });
}

/**----------the new wey to post (new requests from waiters) */
export async function FetchPP(url, data) {
  let realUrl = server + url;
  console.log("welcom to Fetch New Post");
  let [token, isWaiter] = getToken();

  fetch(realUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      // console.log(res);

      if (res.ok) {
        console.log(177, "new requests created");
      } else {
        console.error("Failed to create");
      }
      return res.json();
    })
    .then((resData) => {
      // console.log("Parsed Response:",data, resData);
      return resData; // Return the parsed data
    })
    .catch((error) => {
      // console.error("Error in FetchPP:", error);
      return null; // Handle errors by returning null or another fallback value
    });
}

/**----------Fetch put---------------- */
export async function FetchPut(url, data, setState) {
  let realUrl = server + url;
  console.log("welcom to FetchPut");
  let [token, isWaiter] = getToken();
  fetch(realUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      isAwaiter: token,
      authorization: isWaiter,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log(208, "updated");
      } else {
        console.error("Failed to update");
      }
      return res.json();
    })
    .then((json) => {
      // console.log("json", json);
      if (setState) {
        setState(json);
      }
      return json;
    });
}

/**---------Fetch new delete ---------- */
export async function FetchDD(url, data) {
  let realUrl = server + url;
  console.log("welcom to FetchDD");
  let [token, isWaiter] = getToken();
  fetch(realUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      // console.log(res);

      if (res.ok) {
        console.log(266, "new requests created");
      } else {
        console.error("Failed to create");
      }
      return res.json();
    })
    .then((json) => {
      if (json) {
        return json;
      }
    });
}
