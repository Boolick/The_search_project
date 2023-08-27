import axios from "axios";

async function checkToken(token: string) {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log("Token is valid");
    console.log("User:", response.data.login);
    console.log("Email:", response.data.email);
    console.log("Scopes:", response.headers["x-oauth-scopes"]);
  } catch (error) {
    console.log("Token is invalid");
  }
}

export default checkToken; // замените YOUR_TOKEN на значение вашего токена
