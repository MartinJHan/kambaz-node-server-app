import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";


export function findAllCourses() {
  return model.find();
}
export async function findCoursesForEnrolledUser(userId) {
  try {
    // 获取用户的所有enrollments
    const enrollments = await enrollmentModel.find({ user: userId });
    
    // 提取course IDs
    const courseIds = enrollments.map(enrollment => enrollment.course);
    
    // 根据course IDs查找完整的课程信息
    const courses = await model.find({ _id: { $in: courseIds } });
    
    return courses;
  } catch (error) {
    console.error("Error finding courses for enrolled user:", error);
    throw error;
  }
}
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}
export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
