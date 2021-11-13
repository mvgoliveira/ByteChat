import { UsersService } from "../services/UsersSevice";

class UsersController {
  async create(req, res) {
    const { email, password, confirmPassword } = req.body;
    const usersService = new UsersService();

    try {
      const user = await usersService.create(email.toLowerCase(), password, confirmPassword);
      return res.json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

  }
}

export {UsersController}