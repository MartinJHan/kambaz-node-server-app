import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  _id: String,
  user: { type: String, required: true },
  course: { type: String, required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "DROPPED"],
    default: "ACTIVE"
  },
  grade: String
}, { collection: "enrollments" });

export default enrollmentSchema;