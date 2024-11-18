/**----------Fetch get---------------- */
export async function Fetch(url, setState) {
  console.log("welcom to Fetch");

  console.log("url:", url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.succeed) {
        setState(json.resultsArray);
      }
      console.log("json:", json.resultsArray);
    });
}
/**---------------Fetch for token -------------- */
export async function FetchToken(url, Token, setState) {
  console.log("welcom to FetchToken");

  console.log("url:", url);
  console.log("Token:", Token[0]);
  console.log("waiter?", JSON.parse(Token[1]));
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: Token[0],
      isAwaiter: Token[1],
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.succeed) {
        setState(json.data);
      }
      console.log("json:", json);
    });
}

/**----------Fetch get + header ---------------- */
export async function FetchIncludeHeader(url, email, setState, isAwaiter) {
  console.log("welcom to FetchIncludeHeader");

  console.log("url:", url);
  console.log("email:", email);
  console.log("waiter?", isAwaiter);

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email,
      isAwaiter: isAwaiter,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.succeed) {
        setState(json.data);
      }
      console.log("json:", json);
    });
}

/**----------Fetch post---------------- */
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
          setState(json);
          console.log(35, "hi");
          return json;
        } else {
          console.log("There is no setState");
        }
      }
    });
}

/**----------Fetch put---------------- */
export async function FetchPut(url, data, setState, email) {
  console.log("welcom to FetchPut");
  console.log(28, "data:", data);
  console.log(29, "url:", url);
  console.log("email:", email);
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      email: email,
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
export async function FetchDelete(url, email, event) {
  console.log("welcom to FetchDelete");

  console.log(76, "url:", url);
  console.log("email:", email);
  console.log("event.id:", event.id);
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: email,
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
