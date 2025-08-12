import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findAllAssignments() {
  return await model.find();
}

export async function findAssignmentsForCourse(courseId) {
  return await model.find({ course: courseId });
}

export async function findAssignmentById(assignmentId) {
  return await model.findById(assignmentId);
}

export async function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return await model.create(newAssignment);
}

export async function deleteAssignment(assignmentId) {
  const result = await model.deleteOne({ _id: assignmentId });
  return { success: result.deletedCount > 0 };
}

export async function updateAssignment(assignmentId, assignmentUpdates) {
  const result = await model.updateOne(
    { _id: assignmentId }, 
    { $set: assignmentUpdates }
  );
  if (result.modifiedCount > 0) {
    return await model.findById(assignmentId);
  }
  return null;
}