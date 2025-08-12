import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await dao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await dao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  const deleteEnrollment = async (req, res) => {
    const { enrollmentId } = req.params;
    const result = await dao.deleteEnrollment(enrollmentId);
    res.json(result);
  };

  // API endpoints
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
  app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse);
  app.put("/api/enrollments/:uid/:cid", enrollUserInCourse);
  app.delete("/api/enrollments/:uid/:cid", unenrollUserFromCourse);
  app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
} 