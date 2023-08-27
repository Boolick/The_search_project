import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { SearchWrapper, SearchInput, StyledButton } from "../Styles/styles";
import { User } from "../../Store/Store";
import checkToken from "../../Components/Search/chek";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const dispatch = useDispatch();
  const token = "";
  // проверка токена для доступа к данным gitHub
  checkToken(token);

  const handleSearch = useCallback(async () => {
    if (!searchValue) return;
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchValue}&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const users: User[] = response.data.items;

      const usersWithRepos = await Promise.all(
        users.map(async (user: User) => {
          const response = await axios.get(user.url, {
            headers: {
              Authorization: `token ${token}`,
            },
          });

          return {
            ...user,
            public_repos: response.data.public_repos,
            email: response.data.email,
            followers: response.data.followers,
          };
        })
      );
      dispatch({ type: "SEARCH_USERS", payload: usersWithRepos });
    } catch (error) {
      console.error(error);
    }
  }, [searchValue, page, perPage, dispatch]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <SearchWrapper>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <SearchInput
          data-testid={"input-search"}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <StyledButton onClick={handleSearch} type="submit">
          Search
        </StyledButton>
        <StyledButton onClick={handleNextPage} type="button">
          NextPage
        </StyledButton>
        <StyledButton onClick={handlePrevPage} type="button">
          PrevPage
        </StyledButton>
      </form>
    </SearchWrapper>
  );
}

export default Search;
