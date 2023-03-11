/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Course = {
  __typename?: 'Course';
  Code: Scalars['String'];
  Credit: Scalars['Int'];
  LecturerNIP: Scalars['String'];
  Name: Scalars['String'];
  Semester: Scalars['Int'];
};

export type CourseInput = {
  Code: Scalars['String'];
  Credit: Scalars['Int'];
  LecturerNIP: Scalars['String'];
  Name: Scalars['String'];
  Semester: Scalars['Int'];
};

export type Enrollment = {
  __typename?: 'Enrollment';
  CourseCode: Scalars['String'];
  Grade: Scalars['Float'];
  StudentNIM: Scalars['String'];
};

export type EnrollmentInput = {
  CourseCode: Scalars['String'];
  Grade: Scalars['Float'];
  StudentNIM: Scalars['String'];
};

export type Lecturer = {
  __typename?: 'Lecturer';
  Address: Scalars['String'];
  NIP: Scalars['String'];
  Name: Scalars['String'];
};

export type LecturerInput = {
  Address: Scalars['String'];
  NIP: Scalars['String'];
  Name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse?: Maybe<Course>;
  createEnrollment?: Maybe<Enrollment>;
  createLecturer?: Maybe<Lecturer>;
  createStudent?: Maybe<Student>;
  deleteCourse?: Maybe<Course>;
  deleteEnrollment?: Maybe<Enrollment>;
  deleteLecturer?: Maybe<Lecturer>;
  deleteStudent?: Maybe<Student>;
  updateCourse?: Maybe<Course>;
  updateEnrollment?: Maybe<Enrollment>;
  updateLecturer?: Maybe<Lecturer>;
  updateStudent?: Maybe<Student>;
};


export type MutationCreateCourseArgs = {
  input: CourseInput;
};


export type MutationCreateEnrollmentArgs = {
  input: EnrollmentInput;
};


export type MutationCreateLecturerArgs = {
  input: LecturerInput;
};


export type MutationCreateStudentArgs = {
  input: StudentInput;
};


export type MutationDeleteCourseArgs = {
  Code: Scalars['String'];
};


export type MutationDeleteEnrollmentArgs = {
  CourseCode: Scalars['String'];
  StudentNIM: Scalars['String'];
};


export type MutationDeleteLecturerArgs = {
  NIP: Scalars['String'];
};


export type MutationDeleteStudentArgs = {
  NIM: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  input: CourseInput;
};


export type MutationUpdateEnrollmentArgs = {
  input: EnrollmentInput;
};


export type MutationUpdateLecturerArgs = {
  input: LecturerInput;
};


export type MutationUpdateStudentArgs = {
  input: StudentInput;
};

export type Query = {
  __typename?: 'Query';
  course?: Maybe<Course>;
  courses?: Maybe<Array<Maybe<Course>>>;
  enrollment?: Maybe<Enrollment>;
  enrollments?: Maybe<Array<Maybe<Enrollment>>>;
  lecturer?: Maybe<Lecturer>;
  lecturers?: Maybe<Array<Maybe<Lecturer>>>;
  student?: Maybe<Student>;
  students?: Maybe<Array<Maybe<Student>>>;
};


export type QueryCourseArgs = {
  Code: Scalars['String'];
};


export type QueryEnrollmentArgs = {
  CourseCode: Scalars['String'];
  StudentNIM: Scalars['String'];
};


export type QueryLecturerArgs = {
  NIP: Scalars['String'];
};


export type QueryStudentArgs = {
  NIM: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  Address: Scalars['String'];
  NIM: Scalars['String'];
  Name: Scalars['String'];
};

export type StudentInput = {
  Address: Scalars['String'];
  NIM: Scalars['String'];
  Name: Scalars['String'];
};

export type GetCourseQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCourseQuery = { __typename?: 'Query', courses?: Array<{ __typename?: 'Course', Code: string, Name: string, Credit: number, Semester: number, LecturerNIP: string } | null> | null };

export type CreateCourseMutationVariables = Exact<{
  input: CourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse?: { __typename?: 'Course', Code: string, Name: string, Credit: number, Semester: number, LecturerNIP: string } | null };

export type UpdateCourseMutationVariables = Exact<{
  input: CourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse?: { __typename?: 'Course', Code: string, Name: string, Credit: number, Semester: number, LecturerNIP: string } | null };

export type DeleteCourseMutationVariables = Exact<{
  Code: Scalars['String'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse?: { __typename?: 'Course', Code: string, Name: string, Credit: number, Semester: number, LecturerNIP: string } | null };

export type GetLecturersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLecturersQuery = { __typename?: 'Query', lecturers?: Array<{ __typename?: 'Lecturer', NIP: string, Name: string } | null> | null };

export type GetLecturerByNipQueryVariables = Exact<{
  NIP: Scalars['String'];
}>;


export type GetLecturerByNipQuery = { __typename?: 'Query', lecturer?: { __typename?: 'Lecturer', NIP: string, Name: string } | null };

export type GetEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnrollmentsQuery = { __typename?: 'Query', enrollments?: Array<{ __typename?: 'Enrollment', StudentNIM: string, CourseCode: string, Grade: number } | null> | null };

export type CreateEnrollmentMutationVariables = Exact<{
  input: EnrollmentInput;
}>;


export type CreateEnrollmentMutation = { __typename?: 'Mutation', createEnrollment?: { __typename?: 'Enrollment', StudentNIM: string, CourseCode: string, Grade: number } | null };

export type UpdateEnrollmentMutationVariables = Exact<{
  input: EnrollmentInput;
}>;


export type UpdateEnrollmentMutation = { __typename?: 'Mutation', updateEnrollment?: { __typename?: 'Enrollment', StudentNIM: string, CourseCode: string, Grade: number } | null };

export type DeleteEnrollmentMutationVariables = Exact<{
  StudentNIM: Scalars['String'];
  CourseCode: Scalars['String'];
}>;


export type DeleteEnrollmentMutation = { __typename?: 'Mutation', deleteEnrollment?: { __typename?: 'Enrollment', StudentNIM: string, CourseCode: string, Grade: number } | null };

export type GetEnrollmentStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnrollmentStudentsQuery = { __typename?: 'Query', students?: Array<{ __typename?: 'Student', NIM: string, Name: string } | null> | null };

export type GetStudentByNimQueryVariables = Exact<{
  NIM: Scalars['String'];
}>;


export type GetStudentByNimQuery = { __typename?: 'Query', student?: { __typename?: 'Student', NIM: string, Name: string } | null };

export type GetEnrollmentCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnrollmentCoursesQuery = { __typename?: 'Query', courses?: Array<{ __typename?: 'Course', Code: string, Name: string } | null> | null };

export type GetCourseByCodeQueryVariables = Exact<{
  Code: Scalars['String'];
}>;


export type GetCourseByCodeQuery = { __typename?: 'Query', course?: { __typename?: 'Course', Code: string, Name: string } | null };

export type GetLecturerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLecturerQuery = { __typename?: 'Query', lecturers?: Array<{ __typename?: 'Lecturer', NIP: string, Name: string, Address: string } | null> | null };

export type CreateLecturerMutationVariables = Exact<{
  input: LecturerInput;
}>;


export type CreateLecturerMutation = { __typename?: 'Mutation', createLecturer?: { __typename?: 'Lecturer', NIP: string, Name: string, Address: string } | null };

export type UpdateLecturerMutationVariables = Exact<{
  input: LecturerInput;
}>;


export type UpdateLecturerMutation = { __typename?: 'Mutation', updateLecturer?: { __typename?: 'Lecturer', NIP: string, Name: string, Address: string } | null };

export type DeleteLecturerMutationVariables = Exact<{
  NIP: Scalars['String'];
}>;


export type DeleteLecturerMutation = { __typename?: 'Mutation', deleteLecturer?: { __typename?: 'Lecturer', NIP: string, Name: string, Address: string } | null };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { __typename?: 'Query', students?: Array<{ __typename?: 'Student', NIM: string, Name: string, Address: string } | null> | null };

export type CreateStudentMutationVariables = Exact<{
  input: StudentInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent?: { __typename?: 'Student', NIM: string, Name: string, Address: string } | null };

export type UpdateStudentMutationVariables = Exact<{
  input: StudentInput;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent?: { __typename?: 'Student', NIM: string, Name: string, Address: string } | null };

export type DeleteStudentMutationVariables = Exact<{
  NIM: Scalars['String'];
}>;


export type DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent?: { __typename?: 'Student', NIM: string, Name: string, Address: string } | null };


export const GetCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Credit"}},{"kind":"Field","name":{"kind":"Name","value":"Semester"}},{"kind":"Field","name":{"kind":"Name","value":"LecturerNIP"}}]}}]}}]} as unknown as DocumentNode<GetCourseQuery, GetCourseQueryVariables>;
export const CreateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Credit"}},{"kind":"Field","name":{"kind":"Name","value":"Semester"}},{"kind":"Field","name":{"kind":"Name","value":"LecturerNIP"}}]}}]}}]} as unknown as DocumentNode<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Credit"}},{"kind":"Field","name":{"kind":"Name","value":"Semester"}},{"kind":"Field","name":{"kind":"Name","value":"LecturerNIP"}}]}}]}}]} as unknown as DocumentNode<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const DeleteCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Credit"}},{"kind":"Field","name":{"kind":"Name","value":"Semester"}},{"kind":"Field","name":{"kind":"Name","value":"LecturerNIP"}}]}}]}}]} as unknown as DocumentNode<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const GetLecturersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLecturers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lecturers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIP"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}}]}}]} as unknown as DocumentNode<GetLecturersQuery, GetLecturersQueryVariables>;
export const GetLecturerByNipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLecturerByNIP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"NIP"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lecturer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NIP"},"value":{"kind":"Variable","name":{"kind":"Name","value":"NIP"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIP"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}}]}}]} as unknown as DocumentNode<GetLecturerByNipQuery, GetLecturerByNipQueryVariables>;
export const GetEnrollmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StudentNIM"}},{"kind":"Field","name":{"kind":"Name","value":"CourseCode"}},{"kind":"Field","name":{"kind":"Name","value":"Grade"}}]}}]}}]} as unknown as DocumentNode<GetEnrollmentsQuery, GetEnrollmentsQueryVariables>;
export const CreateEnrollmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEnrollment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEnrollment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StudentNIM"}},{"kind":"Field","name":{"kind":"Name","value":"CourseCode"}},{"kind":"Field","name":{"kind":"Name","value":"Grade"}}]}}]}}]} as unknown as DocumentNode<CreateEnrollmentMutation, CreateEnrollmentMutationVariables>;
export const UpdateEnrollmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEnrollment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEnrollment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StudentNIM"}},{"kind":"Field","name":{"kind":"Name","value":"CourseCode"}},{"kind":"Field","name":{"kind":"Name","value":"Grade"}}]}}]}}]} as unknown as DocumentNode<UpdateEnrollmentMutation, UpdateEnrollmentMutationVariables>;
export const DeleteEnrollmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEnrollment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"StudentNIM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"CourseCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEnrollment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"StudentNIM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"StudentNIM"}}},{"kind":"Argument","name":{"kind":"Name","value":"CourseCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"CourseCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StudentNIM"}},{"kind":"Field","name":{"kind":"Name","value":"CourseCode"}},{"kind":"Field","name":{"kind":"Name","value":"Grade"}}]}}]}}]} as unknown as DocumentNode<DeleteEnrollmentMutation, DeleteEnrollmentMutationVariables>;
export const GetEnrollmentStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrollmentStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}}]}}]} as unknown as DocumentNode<GetEnrollmentStudentsQuery, GetEnrollmentStudentsQueryVariables>;
export const GetStudentByNimDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudentByNIM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"NIM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NIM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"NIM"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}}]}}]} as unknown as DocumentNode<GetStudentByNimQuery, GetStudentByNimQueryVariables>;
export const GetEnrollmentCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrollmentCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}}]}}]} as unknown as DocumentNode<GetEnrollmentCoursesQuery, GetEnrollmentCoursesQueryVariables>;
export const GetCourseByCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}}]}}]}}]} as unknown as DocumentNode<GetCourseByCodeQuery, GetCourseByCodeQueryVariables>;
export const GetLecturerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLecturer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lecturers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIP"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<GetLecturerQuery, GetLecturerQueryVariables>;
export const CreateLecturerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLecturer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LecturerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLecturer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIP"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<CreateLecturerMutation, CreateLecturerMutationVariables>;
export const UpdateLecturerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLecturer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LecturerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLecturer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIP"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<UpdateLecturerMutation, UpdateLecturerMutationVariables>;
export const DeleteLecturerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLecturer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"NIP"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLecturer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NIP"},"value":{"kind":"Variable","name":{"kind":"Name","value":"NIP"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIP"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<DeleteLecturerMutation, DeleteLecturerMutationVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;
export const CreateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<CreateStudentMutation, CreateStudentMutationVariables>;
export const UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const DeleteStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"NIM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NIM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"NIM"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentMutation, DeleteStudentMutationVariables>;