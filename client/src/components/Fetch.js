/**----------Fetch get---------------- */
export async function Fetch(url, token, setState) {
  console.log("welcom to Fetch");
  console.log(token);
  console.log("url:", url);
  // fetch(url)
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token[0],
      isAwaiter: token[1],
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.succeed) {
        setState(json.resultsArray);
      }
      console.log("json:", json.resultsArray);
    });
}

/**--Fetch send token in header, 
 * and set the state with the data respons-- */
export async function FetchToken(url, token, setState) {
  console.log("welcom to FetchToken");

  console.log("url:", url);
  console.log("Token:", token[0]);
  console.log("waiter?", JSON.parse(token[1]));
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token[0],
      isAwaiter: token[1],
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json?.succeed) {
        setState(json.data);
      }
      console.log("json:", json);
    });
}

/**----------Fetch get + header ---------------- */
export async function FetchIncludeHeader(url, email, setState, token) {
  console.log("welcom to FetchIncludeHeader");

  console.log("url:", url);
  console.log("email:", email);
  console.log("waiter?", token[1]);
  console.log("token", token[0]);

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email,
      isAwaiter: token[1],
      authorization: token[0],
    },
  })
    .then((res) => {
      console.log(res);
      res.json();
    })
    .then((json) => {
      if (json?.succeed) {
        setState(json.data);
      }
      console.log("json:", json);
    });
}

/**----------Fetch post for register/login---------------- */
export async function FetchPost(url, data, setState, email) {
  console.log("welcom to FetchPost");
  console.log(28, "data:", data);
  console.log(29, "url:", url);
  console.log("email:", email);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: `${email}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log(43, "post created");

        return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        console.log("json:", json);
        if (setState) {
          setState(json.data);
          if (json.data.token) {
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
export async function FetchNewEvent(url, data, setState, email, token) {
  console.log("welcom to FetchNewEvent");
  console.log(28, "data:", data);
  console.log(29, "url:", url);
  console.log("email:", email);
  console.log("token:", token[0]);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: `${email}`,
      isAwaiter: token[1],
      authorization: token[0],
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log(43, "post created");

        return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        console.log("json:", json);
        if (setState) {
          setState(json.data); // todo: replace with json.data
          if (json.data.token) {
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


/**----------the new wey to post (new requests from waiters) */
export async function FetchPP(url, data, token) {
  console.log("welcom to FetchNewEvent");
  console.log(29, "url:", url);
  console.log(28, "data:",  JSON.stringify(data), typeof data);
    console.log("token:", token[0]);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
            authorization: token[0],
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      
      if (res.ok) {
        console.log(43, "new requests created");
                return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        console.log("json:", json);

          return json;
        }
    });
}

/**----------Fetch put---------------- */
export async function FetchPut(url, data, setState, email, token) {
  console.log("welcom to FetchPut");
  console.log(28, "data:", data);
  console.log(29, "url:", url);
  console.log("email:", email);
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      email: email,
      isAwaiter: token[1],
      authorization: token[0],
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log("updated");
        return res.json();
      } else {
        console.error("Failed to update");
      }
    })
    .then((json) => {
      if (json) {
        console.log("json", json);
        if (setState) {
          setState(json);
        }
      }
    });
}

/**----------Fetch delete---------------- */
export async function FetchDelete(url, email, event, token) {
  console.log("welcom to FetchDelete");

  console.log(76, "url:", url);
  console.log("email:", email);
  console.log("event.id:", event.id);
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: email,
      isAwaiter: token[1],
      authorization: token[0],
    },
    body: JSON.stringify({ id: event.id }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("deleted");
        return res.json();
      } else {
        console.error("Failed to delete");
      }
    })
    .then((json) => {
      if (json) {
        console.log("json:", json);
      }
    });
}


/**---------Fetch new delete ---------- */
export async function FetchDD(url, data, token) {
  console.log("welcom to FetchNewDelete");
  console.log(29, "url:", url);
  console.log(28, "data:",  JSON.stringify(data), typeof data);
    console.log("token:", token[0]);

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
            authorization: token[0],
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      
      if (res.ok) {
        console.log(43, "new requests created");
                return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        console.log("json:", json);

          return json;
        }
    });
}