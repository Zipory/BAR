export async function Fetch(url, setState) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      console.log(json);
    });
  console.log(url);
}

export async function FetchPost(url, data, setState) {
  try {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      // i dont know why i need this
      .then((json) => {
        if (json) {
          if (setState) {
            setState(json);
          } else {
            console.log("There is no setState");
          }
        }
      });   
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
