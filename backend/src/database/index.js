import mongoose from "mongoose";

export function MongoDB() {
  mongoose.connect(process.env.MONGO_URL);
}