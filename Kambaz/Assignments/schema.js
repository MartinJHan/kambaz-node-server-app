import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  course: { type: String, required: true },
  description: String,
  available: String,
  due: String,
  availableDate: String,
  dueDate: String,
  points: Number,
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED", "CLOSED"],
    default: "DRAFT"
  }
}, { collection: "assignments" });

export default assignmentSchema; 