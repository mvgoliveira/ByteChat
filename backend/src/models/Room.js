import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    require: true
  },

  adminId: {
    type: String,
    required: true
  },

  private: {
    type: Boolean,
    required: true,
    default: false
  },

  usersAllowed: {
    type: [String],
    required: false
  }
}, {
  timestamps: true
});

const RoomModel = mongoose.model('Rooms', RoomSchema);

export {RoomModel}