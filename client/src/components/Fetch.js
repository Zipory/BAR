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
    // let response = null;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          // console.log("created");
  
          return res.json();
        } else {
          console.error("Failed to create");
        }
      })
      .then((json) => {
        if (json) {
          if (setState) {
            setState(json);
          } else {
            console.log("There is no setState");
          }
        }
      });
  }