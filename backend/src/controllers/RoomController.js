import { RoomsService } from "../services/RoomsService";
import Chance from "chance";

class RoomController {
  async create (req, res) {
    const {adminId, isPrivate, connections} = req.body;
    
    const chance = new Chance();
    let roomCode = chance.string({ length: 10, casing: 'upper', alpha: true, numeric: true });

    const roomsService = new RoomsService();

    const roomExists = await roomsService.findOne(roomCode);

    if (roomExists) {
      this.create();
    }

    try {
      const room = await roomsService.create(roomCode, adminId, isPrivate, connections);
      return res.json(room);
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  async findOne(req, res) {
    const { roomCode } = req.params;
    const roomsService = new RoomsService();

    const room = await roomsService.findOne(roomCode);
    
    return res.json(room);
  }

  async update(req, res) {
    const { usersAllowed } = req.body;
    const { roomCode } = req.params;

    const roomsService = new RoomsService();

    try {
      await roomsService.update(roomCode, usersAllowed);
      return res.json({ message: "Updated!" });
    } catch (error) {
      return res.status(400).json({ message: error.message }); 
    }
  }

  async delete(req, res) {
    const {roomCode} = req.params;
    
    const roomsService = new RoomsService();
    
    try {
      await roomsService.delete(roomCode);
      return res.json({ message: "deleted!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { RoomController }