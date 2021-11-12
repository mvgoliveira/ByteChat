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

  connections: {
    type: Number,
    required: true,
    default: 0
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