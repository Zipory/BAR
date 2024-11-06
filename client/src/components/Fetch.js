export async function Fetch(url, setState) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      console.log(json);
    });
  console.log(url);
}

export async function FetchIncludeHeader(url, email, setState) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: `${email}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      console.log(json);
    });
  console.log(url);
}

export async function FetchPost(url, data, setState, userEmail) {
  console.log(13, "hi");
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
        console.log("created");

        return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        if (setState) {
          setState(json);
          console.log(35, "hi");
        } else {
          console.log("There is no setState");
        }
      }
    });
}
