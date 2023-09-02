import { useEffect } from "react";
import { Provider } from "react-redux";

import { Container } from "./Components/Styles/styles";
import Search from "./Components/Search/Search";
import UsersList from "./Components/Search/UsersList";
import { store } from "./Store/Store";

function App() {
  useEffect(() => {
    // Задаём иконку сайта
    const link =
      (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
      (document.createElement("link") as HTMLLinkElement);
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = "/icons8-github-50.png";
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  return (
    <Provider store={store}>
      <Search />
      <Container className="card">
        <UsersList />
      </Container>
    </Provider>
  );
}

export default App;
