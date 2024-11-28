import { getToken } from "./entry/CheckToken";

/**----------Fetch get---------------- */
// export async function Fetch(url, setState) {
//   let [token, isWaiter] = getToken();
//   console.log("welcom to Fetch");
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: token,
//       isAwaiter: isWaiter,
//     },
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       if (json.succeed) {
//         setState(json.resultsArray);
//       }
//       // console.log("json:", json.resultsArray);
//     });
// }

/**--Fetch send token in header,
 * and set the state with the data respons-- */
export async function FetchToken(url, setState) {
  let [token, isWaiter] = getToken();
  console.log("welcom to FetchToken");
  fetch(url, {
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

/**----------Fetch get + header ---------------- */
// export async function FetchIncludeHeader(url, email, setState, token) {
//   console.log("welcom to FetchIncludeHeader");

//   // console.log("url:", url);
//   // console.log("email:", email);
//   // console.log("waiter?", token[1]);
//   // console.log("token", token[0]);

//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       email: email,
//       isAwaiter: token[1],
//       authorization: token[0],
//     },
//   })
//     .then((res) => {
//       // console.log(res);
//       return res.json();
//     })
//     .then((json) => {
//       // console.log("json:", json);
//       if (json?.succeed) {
//         setState(json.data);
//       }
//     });
// }

/**----------Fetch post for register/login---------------- */
export async function FetchPost(url, data, setState) {
  console.log("welcom to FetchPost");
  console.log(82, "data:", data);
  // console.log(83, "url:", url);
  // console.log(84, "email:", data.email);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email:  data["email"],
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
  console.log("welcom to FetchNewEvent");
  let [token, isWaiter] = getToken();
  fetch(url, {
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
  console.log("welcom to Fetch New Post");
  let [token, isWaiter] = getToken();

  fetch(url, {
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
  console.log("welcom to FetchPut");
  let [token, isWaiter] = getToken();
  fetch(url, {
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

/**----------Fetch delete---------------- */
// export async function FetchDelete(url, id) {
//   console.log("welcom to FetchDelete");
//   let [token, isWaiter] = getToken();
//   fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       isAwaiter: isWaiter,
//       authorization: token,
//     },
//     body: JSON.stringify(id),
//   })
//     .then((res) => {
//       if (res.ok) {
//         console.log("deleted");
//       } else {
//         console.error("Failed to delete");
//       }
//       return res.json();
//     })
//     .then((json) => {
//         // console.log("json:", json);
//         return json;
//     });
// }

/**---------Fetch new delete ---------- */
export async function FetchDD(url, data) {
  console.log("welcom to FetchDD");
  let [token, isWaiter] = getToken();
  fetch(url, {
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
