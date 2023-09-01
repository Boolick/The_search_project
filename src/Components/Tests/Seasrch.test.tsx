import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import Search from "../Search/Search";
import { store } from "../../Store/Store";
import UsersList from "../Search/UsersList";
import { Container } from "../Styles/styles";

jest.mock("axios");

describe("Search", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Search />
        <Container className="card">
          <UsersList />
        </Container>
      </Provider>
    );
  });

  test("renders search input", () => {
    const searchInput = screen.getByTestId("input-search");
    expect(searchInput).toBeInTheDocument();
  });
  test("renders next page button", () => {
    const nextButton = screen.getByTestId("nextButton");
    expect(nextButton).toBeInTheDocument();
  });
  test("renders previous page button", () => {
    const prevButton = screen.getByTestId("prevButton");
    expect(prevButton).toBeInTheDocument();
  });

  test("updates search value on input change", () => {
    const searchInput = screen.getByTestId("input-search") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });
});
