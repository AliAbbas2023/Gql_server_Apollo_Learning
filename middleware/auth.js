import { AuthenticationError } from "apollo-server-errors";
import { Jwt } from "jsonwebtoken";

const Authentication = (context) => {
  const authenticationHeader = context.req.headers.authorization;
  if (authenticationHeader) {
    const token = authenticationHeader.split("Bearer")[1];
    if (token) {
      try {
        const user = jwt.verify(
          token,
          "YiYjChU896dYgEqZDi0ss44e3uCGZfoHPwAb6l17IHs="
        );
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid Token");
      }
    }
    throw new AuthenticationError("Authorization Token must be bearer");
  }
  throw new AuthenticationError("authenticationHeader must be provided");
};
export default Authentication;
