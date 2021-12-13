import { gql } from 'apollo-server';

const projectType = gql`
  # Project
  type Project {
    _id: ID!
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Float!
    startDate: String!
    endDate: String!
    leader_id: ID!
    status: ProjectStatus!
    phase: Phase
    leader: User
    enrollments: [Enrollment]
  }
`;

const enums = gql`
  # Enum for status values
  enum ProjectStatus {
    ACTIVE
    INACTIVE
  }

  # Enum for phase values
  enum Phase {
    STARTED
    IN_PROGRESS
    ENDED
  }
`;

const queries = gql`
  # Query all projects
  type Query {
    allProjects: [Project]!
  }

  type Query {
    project(_id: ID): Project
  }
  
  type Query {
    projectById(_id: ID!): Project!
  }

  type Query {
    projectByPhase(phase: Phase!): [Project]!
  }

  type Query {
    projectByStatus(status: ProjectStatus!): [Project]!
  }

  type Query {
    projectByLeaderId(leader_id: ID!): [Project]!
  }
`;

  const projectMutations = gql`
  type Mutation {
    addProject(input: AddProjectInput!): Project!
  }
  type Mutation {
    updateProject(input: UpdateProjectInput!): Project!
  }

  type Mutation {
    activetProject(input: ActiveProjectInput!): Project!
  }
`;

const inputs = gql`
  input AddProjectInput {
    name: String!
    generalObjective: String!
    specificObjectives: [String]!
    budget: Float!
    leader_id: ID!
  }

  input UpdateProjectInput {
    projectById: ID!
    name: String
    generalObjective: String
    specificObjectives: [String]
    budget: Float
    status: ProjectStatus
    phase: Phase
  }

  input ActiveProjectInput {
    _id: ID!
    status: ProjectStatus!
  }

`;

export default [
  projectType,
  enums,
  queries,
  projectMutations,
  inputs
];
