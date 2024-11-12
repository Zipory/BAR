export async function Fetch(url, setState) {
  console.log("url:", url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      console.log("json:", json);
    });
}

export async function FetchIncludeHeader(url, email, setState, isAwaiter) {
  console.log("url:", url);
  console.log("email:", email);
  console.log("waiter?", isAwaiter);
  
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email,
      isAwaiter : isAwaiter
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      console.log("json:", json);
    });
}

export async function FetchPost(url, data, setState, userEmail) {
  console.log(28, "data:", data);
  console.log(29, "url:", url);
  console.log("email:", userEmail);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: `${userEmail}`,
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
        } else {
          console.log("There is no setState");
        }
      }
    });
}

export async function FetchDelete(url, email, eventID, setState) {
  console.log(29, "url:", url);
  console.log("email:", email);
  console.log("eventID:", eventID);
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: email,
      eventID: eventID,
    },
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
        if (setState) {
          setState(json);
        }
      }
    });
}
