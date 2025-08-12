import mongoose from "mongoose";
import users from "./Kambaz/Database/users.js";
import courses from "./Kambaz/Database/courses.js";
import modules from "./Kambaz/Database/modules.js";
import assignments from "./Kambaz/Database/assignments.js";
import enrollments from "./Kambaz/Database/enrollments.js";

import UserModel from "./Kambaz/Users/model.js";
import CourseModel from "./Kambaz/Courses/model.js";
import ModuleModel from "./Kambaz/Modules/model.js";
import AssignmentModel from "./Kambaz/Assignments/model.js";
import EnrollmentModel from "./Kambaz/Enrollments/model.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

async function initDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to MongoDB successfully!");

    // Clear existing data
    console.log("Clearing existing data...");
    await UserModel.deleteMany({});
    await CourseModel.deleteMany({});
    await ModuleModel.deleteMany({});
    await AssignmentModel.deleteMany({});
    await EnrollmentModel.deleteMany({});

    // Import users
    console.log("Importing users...");
    for (const user of users) {
      await UserModel.create(user);
    }
    console.log(`Imported ${users.length} users`);

    // Import courses
    console.log("Importing courses...");
    for (const course of courses) {
      await CourseModel.create(course);
    }
    console.log(`Imported ${courses.length} courses`);

    // Import modules
    console.log("Importing modules...");
    for (const module of modules) {
      await ModuleModel.create(module);
    }
    console.log(`Imported ${modules.length} modules`);

    // Import assignments
    console.log("Importing assignments...");
    for (const assignment of assignments) {
      await AssignmentModel.create(assignment);
    }
    console.log(`Imported ${assignments.length} assignments`);

    // Import enrollments
    console.log("Importing enrollments...");
    for (const enrollment of enrollments) {
      await EnrollmentModel.create(enrollment);
    }
    console.log(`Imported ${enrollments.length} enrollments`);

    console.log("Database initialization completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initDatabase(); 