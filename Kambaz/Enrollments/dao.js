import model from "./model.js";

export function findAllEnrollments() {
  return model.find();
}

export function findEnrollmentsForUser(userId) {
  return model.find({ user: userId });
}

export function findEnrollmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findEnrollmentById(enrollmentId) {
  return model.findById(enrollmentId);
}

export function findEnrollmentByUserAndCourse(userId, courseId) {
  return model.findOne({ user: userId, course: courseId });
}

export async function enrollUserInCourse(userId, courseId) {
  try {
    const existingEnrollment = await findEnrollmentByUserAndCourse(userId, courseId);
    if (existingEnrollment) {
      // 如果enrollment已存在且状态为ACTIVE，直接返回
      if (existingEnrollment.status === "ACTIVE") {
        return existingEnrollment;
      }
      // 如果enrollment存在但状态不是ACTIVE，更新状态为ACTIVE
      existingEnrollment.status = "ACTIVE";
      existingEnrollment.enrollmentDate = new Date();
      return await existingEnrollment.save();
    }
    
    // 创建新的enrollment
    const newEnrollment = {
      _id: `${userId}_${courseId}`,
      user: userId,
      course: courseId,
      enrollmentDate: new Date(),
      status: "ACTIVE"
    };
    
    return await model.create(newEnrollment);
  } catch (error) {
    console.error("Error enrolling user in course:", error);
    throw error;
  }
}

export async function unenrollUserFromCourse(userId, courseId) {
  try {
    const result = await model.deleteOne({ user: userId, course: courseId });
    if (result.deletedCount > 0) {
      return { success: true, message: "Successfully unenrolled from course" };
    }
    return { success: false, error: "Enrollment not found" };
  } catch (error) {
    console.error("Error unenrolling user from course:", error);
    throw error;
  }
}

export function deleteEnrollment(enrollmentId) {
  return model.deleteOne({ _id: enrollmentId });
}
