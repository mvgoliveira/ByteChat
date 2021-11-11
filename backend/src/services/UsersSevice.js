import { UserModel } from "../models/User";
import { hashSync } from 'bcryptjs';
import * as yup from 'yup';

class UsersService {
  async create(email, password, confirmPassword) {

    const schema = yup.object().shape({
      email: yup.string().email("Email is not valid").required("Email is required"),
      password: yup.string().required("Password is required").min(6),
      confirmPassword: yup.string().required("Confirm password is required")
    })

    try {
      await schema.validate({ email, password, confirmPassword });
    } catch (error) {
      throw new Error(error.erros);
    }
    
    if (password !== confirmPassword) {
      throw new Error("Password does not equal!");
    }
    
    const userAlreadyExists = await UserModel.findOne({ email });
    
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = hashSync(password, 10);

    const user = await UserModel.create({ email, password: passwordHash });

    return user;
  }
}

export { UsersService }