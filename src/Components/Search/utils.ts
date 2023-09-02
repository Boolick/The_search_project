import { User } from "../../Store/Store";

const sortUsers = (users: User[], order: "asc" | "desc") => {
  return [...users].sort((a, b) =>
    order === "asc"
      ? a.public_repos - b.public_repos
      : b.public_repos - a.public_repos
  );
};
export { sortUsers };
