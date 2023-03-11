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
  Lecturer: Lecturer;
  Name: Scalars['String'];
  Semester: Scalars['Int'];
};

export type CourseInput = {
  Code: Scalars['String'];
  Credit: Scalars['Int'];
  Lecturer: Scalars['String'];
  Name: Scalars['String'];
  Semester: Scalars['Int'];
};

export type Enrollment = {
  __typename?: 'Enrollment';
  Course: Course;
  Grade: Scalars['Int'];
  Student: Student;
};

export type EnrollmentInput = {
  Course: Scalars['String'];
  Grade: Scalars['Int'];
  Student: Scalars['String'];
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
  Course: Scalars['String'];
  Student: Scalars['String'];
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
  Course: Scalars['String'];
  Student: Scalars['String'];
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


export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;
export const CreateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<CreateStudentMutation, CreateStudentMutationVariables>;
export const UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const DeleteStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"NIM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"NIM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"NIM"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NIM"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Address"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentMutation, DeleteStudentMutationVariables>;