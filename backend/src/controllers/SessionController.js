import { SessionService } from "../services/SessionService";

class SessionController {
  async create(req, res) {
    const {email, password} = req.body;
    const sessionService = new SessionService();

    try {
      const token = await sessionService.create(email.toLowerCase(), password);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ message: error.message});
    }
  }
}

export {SessionController}