import { useNavigate } from "react-router-dom";
import { Div, Wrapper, Text, Button } from "../components/general";
import { AppRoutes } from "../constants/routes.constants";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper height="100vh">
      <Div margin="0 auto">
        <Text fSize="34px" fWeight="800" lineHeight="20px" align="center">
          Page Not Found
        </Text>
        <Button
          bgc="grey"
          onClick={() => {
            navigate(AppRoutes.home());
          }}
        >
          <Text fSize="18px" fWeight="600" lineHeight="20px" color="#fff">
            Go Back
          </Text>
        </Button>
      </Div>
    </Wrapper>
  );
};

export default PageNotFound;
