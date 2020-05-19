const host = process.env.NODE_ENV === "production" ? "https://nutritionplus.herokuapp.com/" : "http://localhost:3000";

const post = (path, body) => {
  return fetch(`${host}${path}`, {
    credentials: "omit",
    headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors"
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
}

const get = (path) => {
  return fetch(`${host}${path}`, {
    credentials: "omit",
    headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
    method: "GET",
    mode: "cors"
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
}

const http = {
  post: post,
  get: get
};

export default http;
