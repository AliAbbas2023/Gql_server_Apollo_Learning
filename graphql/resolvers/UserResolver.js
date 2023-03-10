import User from "../../models/User.js";
import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const resolvers = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      if (password === undefined || password === "") {
        throw new ApolloError("Please set Password:  " +username , "SET_PASSWORD");
      } else {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          throw new ApolloError(
            "User is already registered with the email " + email,
            "USER_ALREADY_EXIST"
          );
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username: username,
          email: email.toLowerCase(),
          password: encryptedPassword,
        });
        const token = jwt.sign(
          { user_id: newUser._id, email: newUser.email },
          "YiYjChU896dYgEqZDi0ss44e3uCGZfoHPwAb6l17IHs=",
          { expiresIn: "1h" }
        );
        newUser.token = token;
        const res = await newUser.save();
        return {
          id: res.id,
          ...res._doc,
        };
      }
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email: user.email },
          "YiYjChU896dYgEqZDi0ss44e3uCGZfoHPwAb6l17IHs=",
          { expiresIn: "1h" }
        );

        user.token = token;
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        if (!user) {
          throw new ApolloError("No User Found", "No Valid User");
        }
        throw new ApolloError("Incorrect password", "INCORRECT password");
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};

export default resolvers;
