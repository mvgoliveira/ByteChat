import { compareSync } from "bcryptjs";
import * as yup from "yup";
import { UserModel } from "../models/User";
import jwt from "jsonwebtoken";

class SessionService {
  async create(email, password) {
    
    const schema = yup.object().shape({
      email: yup.string().email("Email is not valid").required("Email is required"),
      password: yup.string().required("Password is required").min(6)
    });

    try {
      await schema.validate({ email, password });
    } catch (error) {
      throw new Error(error.erros);
    }

    const user = await UserModel.findOne({ email }).select('email').select('password');
    
    if (!user) {
      throw new Error("User does not exists!");
    }

    if (!(compareSync(password, user.password))) {
      throw new Error('Password does not match!');
    }
    
    const token = jwt.sign (
      { id: user._id, email: user.email},
      process.env.TOKEN_SECRET,
      { expiresIn: 60 * 60 * 24 }
    );

    return token;
  }
}

export {SessionService}