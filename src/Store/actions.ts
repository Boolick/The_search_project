export const SET_TOKEN = "SET_TOKEN";

export function setToken(token: string | null) {
  return { type: SET_TOKEN, token };
}
