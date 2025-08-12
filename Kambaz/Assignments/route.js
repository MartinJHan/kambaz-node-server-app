import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const findAllAssignments = async (req, res) => {
    try {
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      console.error("Error finding all assignments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      console.error("Error finding assignments for course:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const findAssignmentById = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await dao.findAssignmentById(assignmentId);
      if (assignment) {
        res.json(assignment);
      } else {
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error finding assignment by id:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const createAssignment = async (req, res) => {
    try {
      const assignment = req.body;
      const newAssignment = await dao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const updatedAssignment = await dao.updateAssignment(assignmentId, assignmentUpdates);
      if (updatedAssignment) {
        res.json(updatedAssignment);
      } else {
        res.status(404).json({ error: "Assignment not found" });
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await dao.deleteAssignment(assignmentId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // API endpoints
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
