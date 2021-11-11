import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const UserModel = mongoose.model('Users', UserSchema);

export { UserModel }
