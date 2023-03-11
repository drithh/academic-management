/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCourse {\n    courses {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n": types.GetCourseDocument,
    "\n  mutation CreateCourse($input: CourseInput!) {\n    createCourse(input: $input) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n": types.CreateCourseDocument,
    "\n  mutation UpdateCourse($input: CourseInput!) {\n    updateCourse(input: $input) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n": types.UpdateCourseDocument,
    "\n  mutation DeleteCourse($Code: String!) {\n    deleteCourse(Code: $Code) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n": types.DeleteCourseDocument,
    "\n  query GetLecturers {\n    lecturers {\n      NIP\n      Name\n    }\n  }\n": types.GetLecturersDocument,
    "\n  query GetLecturerByNIP($NIP: String!) {\n    lecturer(NIP: $NIP) {\n      NIP\n      Name\n    }\n  }\n": types.GetLecturerByNipDocument,
    "\n  query GetEnrollments {\n    enrollments {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n": types.GetEnrollmentsDocument,
    "\n  mutation CreateEnrollment($input: EnrollmentInput!) {\n    createEnrollment(input: $input) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n": types.CreateEnrollmentDocument,
    "\n  mutation UpdateEnrollment($input: EnrollmentInput!) {\n    updateEnrollment(input: $input) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n": types.UpdateEnrollmentDocument,
    "\n  mutation DeleteEnrollment($StudentNIM: String!, $CourseCode: String!) {\n    deleteEnrollment(StudentNIM: $StudentNIM, CourseCode: $CourseCode) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n": types.DeleteEnrollmentDocument,
    "\n  query GetEnrollmentStudents {\n    students {\n      NIM\n      Name\n    }\n  }\n": types.GetEnrollmentStudentsDocument,
    "\n  query GetStudentByNIM($NIM: String!) {\n    student(NIM: $NIM) {\n      NIM\n      Name\n    }\n  }\n": types.GetStudentByNimDocument,
    "\n  query GetEnrollmentCourses {\n    courses {\n      Code\n      Name\n    }\n  }\n": types.GetEnrollmentCoursesDocument,
    "\n  query GetCourseByCode($Code: String!) {\n    course(Code: $Code) {\n      Code\n      Name\n    }\n  }\n": types.GetCourseByCodeDocument,
    "\n  query GetLecturer {\n    lecturers {\n      NIP\n      Name\n      Address\n    }\n  }\n": types.GetLecturerDocument,
    "\n  mutation CreateLecturer($input: LecturerInput!) {\n    createLecturer(input: $input) {\n      NIP\n      Name\n      Address\n    }\n  }\n": types.CreateLecturerDocument,
    "\n  mutation UpdateLecturer($input: LecturerInput!) {\n    updateLecturer(input: $input) {\n      NIP\n      Name\n      Address\n    }\n  }\n": types.UpdateLecturerDocument,
    "\n  mutation DeleteLecturer($NIP: String!) {\n    deleteLecturer(NIP: $NIP) {\n      NIP\n      Name\n      Address\n    }\n  }\n": types.DeleteLecturerDocument,
    "\n  query GetStudents {\n    students {\n      NIM\n      Name\n      Address\n    }\n  }\n": types.GetStudentsDocument,
    "\n  mutation CreateStudent($input: StudentInput!) {\n    createStudent(input: $input) {\n      NIM\n      Name\n      Address\n    }\n  }\n": types.CreateStudentDocument,
    "\n  mutation UpdateStudent($input: StudentInput!) {\n    updateStudent(input: $input) {\n      NIM\n      Name\n      Address\n    }\n  }\n": types.UpdateStudentDocument,
    "\n  mutation DeleteStudent($NIM: String!) {\n    deleteStudent(NIM: $NIM) {\n      NIM\n      Name\n      Address\n    }\n  }\n": types.DeleteStudentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCourse {\n    courses {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"): (typeof documents)["\n  query GetCourse {\n    courses {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCourse($input: CourseInput!) {\n    createCourse(input: $input) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCourse($input: CourseInput!) {\n    createCourse(input: $input) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCourse($input: CourseInput!) {\n    updateCourse(input: $input) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCourse($input: CourseInput!) {\n    updateCourse(input: $input) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCourse($Code: String!) {\n    deleteCourse(Code: $Code) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCourse($Code: String!) {\n    deleteCourse(Code: $Code) {\n      Code\n      Name\n      Credit\n      Semester\n      LecturerNIP\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLecturers {\n    lecturers {\n      NIP\n      Name\n    }\n  }\n"): (typeof documents)["\n  query GetLecturers {\n    lecturers {\n      NIP\n      Name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLecturerByNIP($NIP: String!) {\n    lecturer(NIP: $NIP) {\n      NIP\n      Name\n    }\n  }\n"): (typeof documents)["\n  query GetLecturerByNIP($NIP: String!) {\n    lecturer(NIP: $NIP) {\n      NIP\n      Name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEnrollments {\n    enrollments {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"): (typeof documents)["\n  query GetEnrollments {\n    enrollments {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEnrollment($input: EnrollmentInput!) {\n    createEnrollment(input: $input) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEnrollment($input: EnrollmentInput!) {\n    createEnrollment(input: $input) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateEnrollment($input: EnrollmentInput!) {\n    updateEnrollment(input: $input) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEnrollment($input: EnrollmentInput!) {\n    updateEnrollment(input: $input) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteEnrollment($StudentNIM: String!, $CourseCode: String!) {\n    deleteEnrollment(StudentNIM: $StudentNIM, CourseCode: $CourseCode) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteEnrollment($StudentNIM: String!, $CourseCode: String!) {\n    deleteEnrollment(StudentNIM: $StudentNIM, CourseCode: $CourseCode) {\n      StudentNIM\n      CourseCode\n      Grade\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEnrollmentStudents {\n    students {\n      NIM\n      Name\n    }\n  }\n"): (typeof documents)["\n  query GetEnrollmentStudents {\n    students {\n      NIM\n      Name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStudentByNIM($NIM: String!) {\n    student(NIM: $NIM) {\n      NIM\n      Name\n    }\n  }\n"): (typeof documents)["\n  query GetStudentByNIM($NIM: String!) {\n    student(NIM: $NIM) {\n      NIM\n      Name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEnrollmentCourses {\n    courses {\n      Code\n      Name\n    }\n  }\n"): (typeof documents)["\n  query GetEnrollmentCourses {\n    courses {\n      Code\n      Name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCourseByCode($Code: String!) {\n    course(Code: $Code) {\n      Code\n      Name\n    }\n  }\n"): (typeof documents)["\n  query GetCourseByCode($Code: String!) {\n    course(Code: $Code) {\n      Code\n      Name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLecturer {\n    lecturers {\n      NIP\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  query GetLecturer {\n    lecturers {\n      NIP\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLecturer($input: LecturerInput!) {\n    createLecturer(input: $input) {\n      NIP\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLecturer($input: LecturerInput!) {\n    createLecturer(input: $input) {\n      NIP\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLecturer($input: LecturerInput!) {\n    updateLecturer(input: $input) {\n      NIP\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateLecturer($input: LecturerInput!) {\n    updateLecturer(input: $input) {\n      NIP\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLecturer($NIP: String!) {\n    deleteLecturer(NIP: $NIP) {\n      NIP\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLecturer($NIP: String!) {\n    deleteLecturer(NIP: $NIP) {\n      NIP\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStudents {\n    students {\n      NIM\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  query GetStudents {\n    students {\n      NIM\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStudent($input: StudentInput!) {\n    createStudent(input: $input) {\n      NIM\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStudent($input: StudentInput!) {\n    createStudent(input: $input) {\n      NIM\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStudent($input: StudentInput!) {\n    updateStudent(input: $input) {\n      NIM\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStudent($input: StudentInput!) {\n    updateStudent(input: $input) {\n      NIM\n      Name\n      Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteStudent($NIM: String!) {\n    deleteStudent(NIM: $NIM) {\n      NIM\n      Name\n      Address\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteStudent($NIM: String!) {\n    deleteStudent(NIM: $NIM) {\n      NIM\n      Name\n      Address\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;