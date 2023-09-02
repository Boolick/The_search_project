import axios from "axios";

async function checkToken(token: string | null) {
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
    return true;
  } catch (error) {
    console.log("Token is invalid");
    return false;
  }
}

export default checkToken;
