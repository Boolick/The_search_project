import { useNavigate } from "react-router-dom";

import {
  SearchWrapper,
  StyledErrorMessage,
  StyledTextError,
} from "../Styles/styles";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <SearchWrapper>
      <StyledTextError style={{ fontSize: "80px" }}>
        Not found 404
      </StyledTextError>
      <StyledErrorMessage onClick={() => navigate("/")}>
        Вернуться на главную
      </StyledErrorMessage>
    </SearchWrapper>
  );
}

export default NotFoundPage;
