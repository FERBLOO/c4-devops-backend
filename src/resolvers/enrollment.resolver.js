// models
import Enrollments from '../models/enrollments.model.js';
import Projects from '../models/projects.model.js';
import Users from '../models/users.model.js';

const allEnrollments = async () => {
  const enrollments = await Enrollments.find();
  return enrollments;
}

const enrollmentById = async (parent, args) => {
  const enrollment = await Enrollments.findById(args._id);
  return enrollment;
};

// Returns a list of enrollments where user is enroll
const enrollmentByUserId = async (parent, args) => {
  const user = await Users.findById(args.user_id);

  if (!user){
    throw new Error("User does not exist");
  }

  const enrollments = await Enrollments.find({ user_id: user._id });
  return enrollments
}

const project = async (parent) => {
  const project = await Projects.findById(parent.project_id);
  return project;
};

const student = async (parent) => {
  const student = await Users.findById(parent.user_id);
  return student;
};

export default {
  enrollmentQueries: {
    allEnrollments,
    enrollmentById,
    enrollmentByUserId,
  },
  Enrollment: {
    project,
    student,
  },

}