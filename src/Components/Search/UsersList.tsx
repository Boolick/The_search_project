import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Item,
  List,
  StyledLink,
  StyledText,
  UserCard,
  StyledButton,
  StyledTitel,
  StyledDescription,
} from "../Styles/styles";
import { Users, User } from "../../Store/Store";

function UsersList() {
  const users = useSelector((state: Users) => state.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const sortUsers = (users: User[], order: "asc" | "desc") => {
    return [...users].sort((a, b) =>
      order === "asc"
        ? a.public_repos - b.public_repos
        : b.public_repos - a.public_repos
    );
  };
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedUsers = sortUsers(users, sortOrder);

  const handleItemClick = (user: User, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCardVisible(true);
    if (selectedUser && selectedUser.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!event.target) return;
      const userCard = document.querySelector("#user-card");
      if (userCard && !userCard.contains(event.target as Node)) {
        setSelectedUser(null);
        setIsCardVisible(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div>
        <List>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledButton onClick={() => setSortOrder("asc")}>
              Сортировать по возрастанию
            </StyledButton>
            <StyledButton onClick={() => setSortOrder("desc")}>
              Сортировать по убыванию
            </StyledButton>
          </div>

          {sortedUsers.map((user) => (
            <Item
              onClick={(event) => handleItemClick(user, event)}
              key={user.id}
            >
              {user.login}
              {"  "}
              {user.public_repos}
              <Avatar src={`${user.avatar_url}`}></Avatar>
            </Item>
          ))}
        </List>
        {selectedUser && (
          <UserCard id="user-card" isVisible={isCardVisible}>
            <StyledTitel>{selectedUser.login}</StyledTitel>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={selectedUser.avatar_url} alt="avatar" />
              <StyledText style={{ color: "#888" }}>
                Accaunt:{"  "}
                <StyledLink href={`${selectedUser.html_url}`}>
                  {selectedUser.html_url}
                </StyledLink>
              </StyledText>
            </div>
            <StyledDescription>
              <StyledText>
                Public repositories: {selectedUser.public_repos}
              </StyledText>

              <StyledText style={{ color: "#26A641" }}>
                Followers: {selectedUser.followers}
              </StyledText>
              <StyledText style={{ color: "#F1E05A" }}>
                Email: {selectedUser.email}
              </StyledText>
            </StyledDescription>
          </UserCard>
        )}
      </div>
    </>
  );
}

export default UsersList;
