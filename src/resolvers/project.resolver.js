import Projects from "../models/projects.model.js";
import Users from "../models/users.model.js";
import Enrollements from "../models/enrollments.model.js";

const allProjects = async (parent, args, { user, errorMessage }) => {
  if(!user) {
    throw new Error(errorMessage);
  }
  const projects = await Projects.find();
  return projects;
};

const addProject = async (parent, args) => {
  let project = new Projects(args.input);
  project = await project.save();
  return project;
};

const projectById = async (parent, args) => {
  const project = await Projects.findById(args._id);
  return project;
};

//pending solve issue date in sandbox
const updateProject = async (parent, args) => {
  const projectUpdated = await Projects.findOneAndUpdate(
    { _id: args.input.projectById },
    {
      name: args.input.name,
      generalObjective: args.input.generalObjective,
      specificObjectives: args.input.specificObjectives,
      budget: args.input.budget,
      // startDate: args.input.startDate,
      // endDate: args.input.endDate,
      status: args.input.status,
      phase: args.input.phase,
    },
    { new: true }
  );
  return projectUpdated;
};



const project = async (parent, args) => {
  const user = await Projects.findById(args._id);
  return user;
};

const leader = async (parent) => {
  const user = await Users.findById(parent.leader_id);
  return user;
};

const enrollments = async (parent) => {
  const enrollments = await Enrollements.find({ project_id: parent._id.toString() });
  return enrollments;
}

export default {
  projectQueries: {
    allProjects,
    project,
    projectById,
  },
  Project: {
    leader,
    enrollments,
  },
  projectMutations: {
    addProject,
    updateProject,
  },
};
