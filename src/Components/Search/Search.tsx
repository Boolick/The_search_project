import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SearchWrapper, SearchInput, StyledButton, StyledLoading, StyledTextError, StyledErrorMessage } from "../Styles/styles";
import { Token, User } from "../../Store/Store";
import checkToken from "../../Components/Search/chekToken";
import { setToken } from "../../Store/actions";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const [, setUserToken] = useState<string | null>();
  const token = useSelector((state: Token) => state.token);
  const [isTokenValid, setIsTokenValid] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Поиск");

  useEffect(() => {
    if (!token) {
      const userToken = prompt("Введите токен")?.toString();
      if (userToken) {
        setUserToken(userToken);
        dispatch(setToken(userToken));
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    async function validateToken() {
      const isValid = await checkToken(token);
      setIsTokenValid(isValid);
    }
    validateToken();
  }, [token]);

  const handleSearch = useCallback(async () => {
    if (!searchValue) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchValue}&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (response.data.total_count === 0) {
        setError(`Пользователь с именем "${searchValue}" не найден`);
        setIsLoading(false);
        return;
      }
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
      setError(null);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  }, [searchValue, page, token, dispatch]);

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
      {isLoading && (
        <StyledLoading>
          <div></div>
        </StyledLoading>
      )}
      {error && <StyledTextError className="error">{error}</StyledTextError>}
      <form
        data-testid={"search-form"}
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
          if (!searchValue) {
            setSearchPlaceholder("Введите имя");
          }
        }}
      >
        <SearchInput
          data-testid={"input-search"}
          type="search"
          placeholder={searchPlaceholder}
          name="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <StyledButton data-testid={"search-button"} onClick={handleSearch} type="submit">
          Search
        </StyledButton>
        <StyledButton
          onClick={handleNextPage}
          data-testid={"nextButton"}
          type="button"
        >
          NextPage
        </StyledButton>
        <StyledButton
          onClick={handlePrevPage}
          data-testid={"prevButton"}
          type="button"
        >
          PrevPage
        </StyledButton>
      </form>
      {isTokenValid === false && (
        <StyledErrorMessage href="https://docs.github.com/ru/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">
          Ваш токен доступа недействителен (для более подробной информации
          пройдите по ссылке)
        </StyledErrorMessage>
      )}
    </SearchWrapper>
  );
}

export default Search;
