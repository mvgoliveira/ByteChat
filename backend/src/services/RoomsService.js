import { RoomModel } from "../models/Room";

class RoomsService {
  
  async create (roomCode, adminId, isPrivate, usersAllowed) {
    const RoomExists = await RoomModel.findOne({ roomCode });

    if (RoomExists) {
      throw new Error("Room already exists!");
    }

    const room = await RoomModel.create({
      adminId,
      roomCode,
      private: isPrivate,
      usersAllowed
    });

    return room; 
  }

  async findOne (roomCode) {
    const rooms = await RoomModel
      .findOne({ roomCode })
      .select('roomCode')
      .select('connections')
      .select('private')
      .select('usersAllowed')
      .select('adminId');

    return rooms;
  }

  async update (roomCode, usersAllowed) {
    const roomExists = await RoomModel.findOne({ roomCode });

    if (!roomExists) {
      throw new Error("Room does not exists");
    }

    try {
      await roomExists.updateOne({ usersAllowed });
      await roomExists.save();
      return;
    } catch (error) {
      throw new Error(error.message);
    } 
  }

  async delete (roomCode) {
    const roomExists = await RoomModel.findOne({ roomCode });

    if (!roomExists) {
      throw new Error("Room does not exists");
    }

    roomExists.deleteOne({ roomCode }, (error) => {
      if (error) {
        throw new Error(error.message);
      }      
    });
  }
}

export { RoomsService }