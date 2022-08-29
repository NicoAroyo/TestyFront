export class AuthenticationService {
  async loginUser(credentials) {
    return fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        throw err;
      });
  }
}
