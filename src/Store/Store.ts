import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

interface SearchUsersAction {
  type: "SEARCH_USERS";
  payload: [];
  token: string | null;
}

interface SetTokenAction {
  type: "SET_TOKEN";
  token: string;
}

const initialState = {
  users: [],
  token: null,
};

const usersReducer = (
  state = initialState.users,
  action: SearchUsersAction
) => {
  switch (action.type) {
    case "SEARCH_USERS":
      return action.payload;
    default:
      return state;
  }
};
const tokenReducer = (state = initialState.token, action: SetTokenAction) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.token;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users: usersReducer,
  token: tokenReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export interface Token {
  token: string | null;
}
export interface Users {
  users: User[];
}

export interface User {
  login: string;
  id: number;  
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string; //"https://api.github.com/users/Boolick";
  html_url: string; //"https://github.com/Boolick";
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string; //"https://api.github.com/users/Boolick/repos";
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
  public_repos: number;
  email: string;
  followers: number;
}
