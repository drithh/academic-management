import type { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Table, { fuzzySort } from './tables/Table';
import Dropdown from './Dropdown';
import ActionColumn from './tables/ActionColumn';
import Modal from './Modal';
import Input from './Input';
import { useQuery, gql, useMutation } from '@apollo/client';
import { graphql } from '../gql';
import type { Course, GetLecturersQuery, Lecturer } from '../gql/types';
import { toast } from 'react-hot-toast';

const GET_COURSES = graphql(/* GraphQL */ `
  query GetCourse {
    courses {
      Code
      Name
      Credit
      Semester
      LecturerNIP
    }
  }
`);

const CREATE_COURSE = graphql(/* GraphQL */ `
  mutation CreateCourse($input: CourseInput!) {
    createCourse(input: $input) {
      Code
      Name
      Credit
      Semester
      LecturerNIP
    }
  }
`);

const UPDATE_COURSE = graphql(/* GraphQL */ `
  mutation UpdateCourse($input: CourseInput!) {
    updateCourse(input: $input) {
      Code
      Name
      Credit
      Semester
      LecturerNIP
    }
  }
`);

const DELETE_COURSE = graphql(/* GraphQL */ `
  mutation DeleteCourse($Code: String!) {
    deleteCourse(Code: $Code) {
      Code
      Name
      Credit
      Semester
      LecturerNIP
    }
  }
`);

const GET_LECTURERS = graphql(/* GraphQL */ `
  query GetLecturers {
    lecturers {
      NIP
      Name
    }
  }
`);

const GET_LECUTER_BY_NIP = graphql(/* GraphQL */ `
  query GetLecturerByNIP($NIP: String!) {
    lecturer(NIP: $NIP) {
      NIP
      Name
    }
  }
`);

const filterLecture = (query: string): Lecturer[] => {
  const { loading, error, data } = useQuery(GET_LECTURERS);
  if (loading || error) return [];
  const lecturers = data?.lecturers as Lecturer[];
  return query === ''
    ? lecturers
    : lecturers.filter((lecturer) =>
        lecturer.Name.toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );
};

const getDisplayValue = (lecturer: Lecturer | null): string => {
  return lecturer?.Name ?? '';
};

export default function Course() {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);

  const [data, setData] = React.useState<Course[]>();

  const { loading, error, data: dataQuery } = useQuery(GET_COURSES);

  const handleAddCourse = () => {
    setShowAddCourseModal(true);
  };

  const handleCloseAddCourseModal = () => {
    setShowAddCourseModal(false);
  };

  const handleEditCourse = (data: Course) => {
    setCurrentCourse(data);
    setShowEditCourseModal(true);
  };

  const handleCloseEditCourseModal = () => {
    setShowEditCourseModal(false);
  };

  const handleDeleteCourse = (data: Course) => {
    setCurrentCourse(data);
    setShowDeleteCourseModal(true);
  };

  const handleCloseDeleteCourseModal = () => {
    setShowDeleteCourseModal(false);
  };

  const columns = React.useMemo<ColumnDef<Course, any>[]>(
    () => [
      {
        accessorKey: 'Code',
        header: () => 'Code',
        size: 30,
        footer: (props) => props.column.id,
      },
      {
        header: 'Name',
        footer: (props) => props.column.id,
        accessorKey: 'Name',
        size: 60,
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'Credit',
        header: () => 'Credit',
        size: 30,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'Semester',
        header: () => 'Semester',
        size: 30,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'LecturerNIP',
        header: () => 'Lecturer_NIP',
        enableResizing: true,
        size: 60,
        footer: (props) => props.column.id,
      },
      ...ActionColumn<Course>(handleEditCourse, handleDeleteCourse),
    ],
    []
  );

  useEffect(() => {
    if (dataQuery?.courses) {
      const courses = dataQuery.courses as Course[];
      setData(courses);
    }
  }, [dataQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;
  if (data === undefined) return <p>Not found</p>;

  return (
    <>
      <AddCourse
        handleCloseModal={handleCloseAddCourseModal}
        showModal={showAddCourseModal}
      />
      <EditCourse
        data={currentCourse}
        handleCloseModal={handleCloseEditCourseModal}
        showModal={showEditCourseModal}
      />
      <DeleteCourse
        data={currentCourse}
        handleCloseModal={handleCloseDeleteCourseModal}
        showModal={showDeleteCourseModal}
      />

      <Table data={data} columns={columns} handleAddData={handleAddCourse} />
    </>
  );
}

interface AddCourseProps {
  handleCloseModal: () => void;
  showModal: boolean;
}

function AddCourse({ handleCloseModal, showModal }: AddCourseProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credit, setCredit] = useState(0);
  const [semester, setSemester] = useState(0);
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);

  const [addCourse, { data, error }] = useMutation(CREATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Course added successfully');
      closeModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code === '' || name === '' || credit === 0 || semester === 0) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    addCourse({
      variables: {
        input: {
          Code: code,
          Name: name,
          Credit: credit,
          Semester: semester,
          LecturerNIP: lecturer?.NIP ?? '',
        },
      },
    });
    if (error) {
      return;
    }
  };

  const closeModal = () => {
    setErrorMsg('');
    setCode('');
    setName('');
    setCredit(0);
    setSemester(0);
    handleCloseModal();
  };

  return (
    <Modal
      title="Add Course"
      showModal={showModal}
      error={errorMsg}
      handleCloseModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={'CODE *'}
        name="code"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setCode(e.currentTarget.value)}
        value={code}
      />
      <Input
        type="text"
        placeholder={'Name *'}
        name="name"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
      />
      <Input
        type="text"
        placeholder={'Credit'}
        name="credit"
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setCredit(parseInt(e.currentTarget.value))}
        value={credit.toString()}
      />
      <Input
        type="text"
        placeholder={'Semester'}
        name="semester"
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setSemester(parseInt(e.currentTarget.value))}
        value={semester.toString()}
      />
      <Dropdown
        selected={lecturer}
        setSelected={setLecturer}
        getDisplayValue={getDisplayValue}
        filterFunction={filterLecture}
      />
    </Modal>
  );
}

interface EditCourseProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Course | undefined;
}

function EditCourse({ handleCloseModal, showModal, data }: EditCourseProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [code, setCode] = useState(data?.Code);
  const [name, setName] = useState(data?.Name);
  const [credit, setCredit] = useState(data?.Credit);
  const [semester, setSemester] = useState(data?.Semester);
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);

  const { loading, data: lecturerData } = useQuery(GET_LECUTER_BY_NIP, {
    variables: { NIP: data?.LecturerNIP ?? '' },
  });

  useEffect(() => {
    if (lecturerData) {
      const lecturer = lecturerData?.lecturer as Lecturer;
      setLecturer(lecturer);
    }
  }, [lecturerData]);

  const [editCourse, { error }] = useMutation(UPDATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Course updated successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      code === undefined ||
      name === undefined ||
      credit === undefined ||
      semester === undefined ||
      lecturer === undefined
    ) {
      setErrorMsg('Please fill all the required fields');
      return;
    }
    editCourse({
      variables: {
        input: {
          Code: code,
          Name: name,
          Credit: credit,
          Semester: semester,
          LecturerNIP: lecturer?.NIP ?? '',
        },
      },
    });
    if (error) {
      return;
    }
  };

  useEffect(() => {
    setCode(data?.Code);
    setName(data?.Name);
    setCredit(data?.Credit);
    setSemester(data?.Semester);
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Modal
      title="Edit Course"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={'CODE *'}
        name="code"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setCode(e.currentTarget.value)}
        value={code}
      />
      <Input
        type="text"
        placeholder={'Name *'}
        name="name"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
      />
      <Input
        type="number"
        placeholder={'Credit'}
        name="credit"
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setCredit(parseInt(e.currentTarget.value))}
        value={credit?.toString()}
      />
      <Input
        type="number"
        placeholder={'Semester'}
        name="semester"
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setSemester(parseInt(e.currentTarget.value))}
        value={semester?.toString()}
      />
      <Dropdown
        selected={lecturer}
        setSelected={setLecturer}
        getDisplayValue={getDisplayValue}
        filterFunction={filterLecture}
      />
    </Modal>
  );
}

interface DeleteCourseProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Course | undefined;
}

function DeleteCourse({
  handleCloseModal,
  showModal,
  data,
}: DeleteCourseProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteCourse, { loading, error }] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Course deleted successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data?.Code === undefined) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    deleteCourse({
      variables: {
        Code: data.Code,
      },
    });
    if (error) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal
      title="Delete Course"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <p className="text-center">Are you sure want to delete {data?.Name}?</p>
    </Modal>
  );
}
