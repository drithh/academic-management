import type { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Table, { fuzzySort } from './tables/Table';
import Dropdown from './Dropdown';
import ActionColumn from './tables/ActionColumn';
import Modal from './Modal';
import Input from './Input';
import { useQuery, gql, useMutation } from '@apollo/client';
import { graphql } from '../gql';
import type {
  Course,
  Enrollment,
  GetLecturersQuery,
  Lecturer,
  Student,
} from '../gql/types';
import { toast } from 'react-hot-toast';

const GET_ENROLLMENTS = graphql(/* GraphQL */ `
  query GetEnrollments {
    enrollments {
      StudentNIM
      CourseCode
      Grade
    }
  }
`);

const CREATE_ENROLLMENT = graphql(/* GraphQL */ `
  mutation CreateEnrollment($input: EnrollmentInput!) {
    createEnrollment(input: $input) {
      StudentNIM
      CourseCode
      Grade
    }
  }
`);

const UPDATE_ENROLLMENT = graphql(/* GraphQL */ `
  mutation UpdateEnrollment($input: EnrollmentInput!) {
    updateEnrollment(input: $input) {
      StudentNIM
      CourseCode
      Grade
    }
  }
`);

const DELETE_ENROLLMENT = graphql(/* GraphQL */ `
  mutation DeleteEnrollment($StudentNIM: String!, $CourseCode: String!) {
    deleteEnrollment(StudentNIM: $StudentNIM, CourseCode: $CourseCode) {
      StudentNIM
      CourseCode
      Grade
    }
  }
`);

const GET_STUDENTS = graphql(/* GraphQL */ `
  query GetEnrollmentStudents {
    students {
      NIM
      Name
    }
  }
`);

const GET_STUDENT_BY_NIM = graphql(/* GraphQL */ `
  query GetStudentByNIM($NIM: String!) {
    student(NIM: $NIM) {
      NIM
      Name
    }
  }
`);

const GET_COURSES = graphql(/* GraphQL */ `
  query GetEnrollmentCourses {
    courses {
      Code
      Name
    }
  }
`);

const GET_COURSE_BY_CODE = graphql(/* GraphQL */ `
  query GetCourseByCode($Code: String!) {
    course(Code: $Code) {
      Code
      Name
    }
  }
`);

const filterStudents = (query: string): Student[] => {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  if (loading || error) return [];
  const students = data?.students as Student[];
  return query === ''
    ? students
    : students.filter((student) =>
        student.Name.toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );
};

const getDisplayStudent = (student: Student | null): string => {
  return student?.Name ?? '';
};

const filterCourses = (query: string): Course[] => {
  const { loading, error, data } = useQuery(GET_COURSES);
  if (loading || error) return [];
  const courses = data?.courses as Course[];
  return query === ''
    ? courses
    : courses.filter((course) =>
        course.Name.toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );
};

const getDisplayCourse = (course: Course | null): string => {
  return course?.Name ?? '';
};

export default function Enrollment() {
  const [showAddEnrollmentModal, setShowAddEnrollmentModal] = useState(false);
  const [showEditEnrollmentModal, setShowEditEnrollmentModal] = useState(false);
  const [currentEnrollment, setCurrentEnrollment] = useState<Enrollment>();
  const [showDeleteEnrollmentModal, setShowDeleteEnrollmentModal] =
    useState(false);

  const [data, setData] = React.useState<Enrollment[]>();

  const { loading, error, data: dataQuery } = useQuery(GET_ENROLLMENTS);

  const handleAddEnrollment = () => {
    setShowAddEnrollmentModal(true);
  };

  const handleCloseAddEnrollmentModal = () => {
    setShowAddEnrollmentModal(false);
  };

  const handleEditEnrollment = (data: Enrollment) => {
    setCurrentEnrollment(data);
    setShowEditEnrollmentModal(true);
  };

  const handleCloseEditEnrollmentModal = () => {
    setShowEditEnrollmentModal(false);
  };

  const handleDeleteEnrollment = (data: Enrollment) => {
    setCurrentEnrollment(data);
    setShowDeleteEnrollmentModal(true);
  };

  const handleCloseDeleteEnrollmentModal = () => {
    setShowDeleteEnrollmentModal(false);
  };

  const columns = React.useMemo<ColumnDef<Enrollment, any>[]>(
    () => [
      {
        header: 'Student',
        footer: (props) => props.column.id,
        accessorKey: 'StudentNIM',
        size: 30,
      },
      {
        accessorKey: 'CourseCode',
        header: () => 'Course',
        size: 30,
        footer: (props) => props.column.id,
      },
      {
        header: 'Grade',
        footer: (props) => props.column.id,
        accessorKey: 'Grade',
        size: 30,
      },
      ...ActionColumn<Enrollment>(handleEditEnrollment, handleDeleteEnrollment),
    ],
    []
  );

  useEffect(() => {
    if (dataQuery?.enrollments) {
      const enrollments = dataQuery.enrollments as Enrollment[];
      console.log(dataQuery);
      setData(enrollments);
    }
  }, [dataQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;
  if (data === undefined) return <p>Not found</p>;

  return (
    <>
      <AddEnrollment
        handleCloseModal={handleCloseAddEnrollmentModal}
        showModal={showAddEnrollmentModal}
      />
      <EditEnrollment
        data={currentEnrollment}
        handleCloseModal={handleCloseEditEnrollmentModal}
        showModal={showEditEnrollmentModal}
      />
      <DeleteEnrollment
        data={currentEnrollment}
        handleCloseModal={handleCloseDeleteEnrollmentModal}
        showModal={showDeleteEnrollmentModal}
      />

      <Table
        data={data}
        columns={columns}
        handleAddData={handleAddEnrollment}
      />
    </>
  );
}

interface AddEnrollmentProps {
  handleCloseModal: () => void;
  showModal: boolean;
}

function AddEnrollment({ handleCloseModal, showModal }: AddEnrollmentProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [grade, setGrade] = useState(0);

  const [addEnrollment, { data, error }] = useMutation(CREATE_ENROLLMENT, {
    refetchQueries: [{ query: GET_ENROLLMENTS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Enrollment added successfully');
      closeModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!student || !course || !grade) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    addEnrollment({
      variables: {
        input: {
          CourseCode: course.Code,
          StudentNIM: student.NIM,
          Grade: grade,
        },
      },
    });
    if (error) {
      return;
    }
  };

  const closeModal = () => {
    setErrorMsg('');
    setGrade(0);
    handleCloseModal();
  };

  return (
    <Modal
      title="Add Enrollment"
      showModal={showModal}
      error={errorMsg}
      handleCloseModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <Dropdown
        selected={student}
        setSelected={setStudent}
        getDisplayValue={getDisplayStudent}
        filterFunction={filterStudents}
        z={100}
      />
      <Dropdown
        selected={course}
        setSelected={setCourse}
        getDisplayValue={getDisplayCourse}
        filterFunction={filterCourses}
      />
      <Input
        type="number"
        placeholder={'Grade'}
        name="grade"
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setGrade(parseFloat(e.currentTarget.value))}
        value={grade.toString()}
      />
    </Modal>
  );
}

interface EditEnrollmentProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Enrollment | undefined;
}

function EditEnrollment({
  handleCloseModal,
  showModal,
  data,
}: EditEnrollmentProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [course, setCourse] = useState<Course | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [grade, setGrade] = useState(data?.Grade);

  const { loading: studentLoading, data: studentData } = useQuery(
    GET_STUDENT_BY_NIM,
    {
      variables: { NIM: data?.StudentNIM ?? '' },
    }
  );

  const { loading: courseLoading, data: courseData } = useQuery(
    GET_COURSE_BY_CODE,
    {
      variables: { Code: data?.CourseCode ?? '' },
    }
  );
  useEffect(() => {
    if (studentData?.student) {
      setStudent(studentData.student as Student);
    }
    if (courseData?.course) {
      setCourse(courseData.course as Course);
    }
  }, [studentData, courseData]);

  const [editEnrollment, { error }] = useMutation(UPDATE_ENROLLMENT, {
    refetchQueries: [{ query: GET_ENROLLMENTS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Enrollment updated successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!student || !course || !grade) {
      setErrorMsg('Please fill all the required fields');
      return;
    }
    editEnrollment({
      variables: {
        input: {
          CourseCode: course.Code,
          StudentNIM: student.NIM,
          Grade: grade,
        },
      },
    });
    if (error) {
      return;
    }
  };

  useEffect(() => {
    setGrade(data?.Grade);
  }, [data]);

  if (studentLoading || courseLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Modal
      title="Edit Enrollment"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Dropdown
        selected={student}
        setSelected={setStudent}
        getDisplayValue={getDisplayStudent}
        filterFunction={filterStudents}
        z={100}
      />
      <Dropdown
        selected={course}
        setSelected={setCourse}
        getDisplayValue={getDisplayCourse}
        filterFunction={filterCourses}
      />
      <Input
        type="number"
        placeholder={'Grade'}
        name="grade"
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setGrade(parseFloat(e.currentTarget.value))}
        value={grade?.toString()}
      />
    </Modal>
  );
}

interface DeleteEnrollmentProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Enrollment | undefined;
}

function DeleteEnrollment({
  handleCloseModal,
  showModal,
  data,
}: DeleteEnrollmentProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteEnrollment, { loading, error }] = useMutation(
    DELETE_ENROLLMENT,
    {
      refetchQueries: [{ query: GET_ENROLLMENTS }],
      onError: (error) => {
        toast.error(error.message);
        setErrorMsg(error.message);
      },
      onCompleted: () => {
        toast.success('Enrollment deleted successfully');
        handleCloseModal();
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data?.CourseCode === undefined || data?.StudentNIM === undefined) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    deleteEnrollment({
      variables: {
        CourseCode: data?.CourseCode,
        StudentNIM: data?.StudentNIM,
      },
    });
    if (error) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal
      title="Delete Enrollment"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <p className="text-center">
        Are you sure want to delete {data?.CourseCode} - {data?.StudentNIM}?
      </p>
    </Modal>
  );
}
