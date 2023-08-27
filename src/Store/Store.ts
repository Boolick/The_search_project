import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

interface SearchUsersAction {
  type: "SEARCH_USERS";
  payload: [];
}

const initialState = {
  users: [],
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

const rootReducer = combineReducers({
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export interface Users {
  users: User[];
}

export interface User {
  login: string;
  id: number; //79834650;
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
