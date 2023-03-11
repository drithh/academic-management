import type { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Table, { fuzzySort } from './tables/Table';
import ActionColumn from './tables/ActionColumn';
import Modal from './Modal';
import Input from './Input';
import { useQuery, gql, useMutation } from '@apollo/client';
import { graphql } from '../gql';
import type { Student } from '../gql/types';
import { toast } from 'react-hot-toast';

const GET_STUDENTS = graphql(/* GraphQL */ `
  query GetStudents {
    students {
      NIM
      Name
      Address
    }
  }
`);

const CREATE_STUDENT = graphql(/* GraphQL */ `
  mutation CreateStudent($input: StudentInput!) {
    createStudent(input: $input) {
      NIM
      Name
      Address
    }
  }
`);

const UPDATE_STUDENT = graphql(/* GraphQL */ `
  mutation UpdateStudent($input: StudentInput!) {
    updateStudent(input: $input) {
      NIM
      Name
      Address
    }
  }
`);

const DELETE_STUDENT = graphql(/* GraphQL */ `
  mutation DeleteStudent($NIM: String!) {
    deleteStudent(NIM: $NIM) {
      NIM
      Name
      Address
    }
  }
`);

export default function Student() {
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student>();
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);

  const [data, setData] = React.useState<Student[]>();

  const { loading, error, data: dataQuery } = useQuery(GET_STUDENTS);

  const handleAddStudent = () => {
    setShowAddStudentModal(true);
  };

  const handleCloseAddStudentModal = () => {
    setShowAddStudentModal(false);
  };

  const handleEditStudent = (data: Student) => {
    setCurrentStudent(data);
    setShowEditStudentModal(true);
  };

  const handleCloseEditStudentModal = () => {
    setShowEditStudentModal(false);
  };

  const handleDeleteStudent = (data: Student) => {
    setCurrentStudent(data);
    setShowDeleteStudentModal(true);
  };

  const handleCloseDeleteStudentModal = () => {
    setShowDeleteStudentModal(false);
  };

  const columns = React.useMemo<ColumnDef<Student, any>[]>(
    () => [
      {
        accessorKey: 'NIM',
        header: () => 'Nim',
        size: 30,
        footer: (props) => props.column.id,
      },
      {
        header: 'Name',
        footer: (props) => props.column.id,
        accessorKey: 'Name',
        size: 30,
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'Address',
        header: () => 'Address',
        enableResizing: true,
        size: 60,
        footer: (props) => props.column.id,
      },
      ...ActionColumn<Student>(handleEditStudent, handleDeleteStudent),
    ],
    []
  );

  useEffect(() => {
    if (dataQuery?.students) {
      const students = dataQuery.students as Student[];
      setData(students);
    }
  }, [dataQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;
  if (data === undefined) return <p>Not found</p>;

  return (
    <>
      <AddStudent
        handleCloseModal={handleCloseAddStudentModal}
        showModal={showAddStudentModal}
      />
      <EditStudent
        data={currentStudent}
        handleCloseModal={handleCloseEditStudentModal}
        showModal={showEditStudentModal}
      />
      <DeleteStudent
        data={currentStudent}
        handleCloseModal={handleCloseDeleteStudentModal}
        showModal={showDeleteStudentModal}
      />

      <Table data={data} columns={columns} handleAddData={handleAddStudent} />
    </>
  );
}

interface AddStudentProps {
  handleCloseModal: () => void;
  showModal: boolean;
}

function AddStudent({ handleCloseModal, showModal }: AddStudentProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [nim, setNim] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addStudent, { data, loading, error }] = useMutation(CREATE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Student added successfully');
      closeModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nim === '' || name === '' || address === '') {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    addStudent({
      variables: {
        input: {
          NIM: nim,
          Name: name,
          Address: address,
        },
      },
    });
    if (error) {
      return;
    }
  };

  const closeModal = () => {
    setErrorMsg('');
    setNim('');
    setName('');
    setAddress('');
    handleCloseModal();
  };

  return (
    <Modal
      title="Add Student"
      showModal={showModal}
      error={errorMsg}
      handleCloseModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={'NIM *'}
        name="nim"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setNim(e.currentTarget.value)}
        value={nim}
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
        placeholder={'Address *'}
        name="address"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setAddress(e.currentTarget.value)}
        value={address}
      />
    </Modal>
  );
}

interface EditStudentProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Student | undefined;
}

function EditStudent({ handleCloseModal, showModal, data }: EditStudentProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [nim, setNim] = useState(data?.NIM);
  const [name, setName] = useState(data?.Name);
  const [address, setAddress] = useState(data?.Address);

  const [editStudent, { loading, error }] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Student added successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nim === undefined || name === undefined || address === undefined) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    editStudent({
      variables: {
        input: {
          NIM: nim,
          Name: name,
          Address: address,
        },
      },
    });
    if (error) {
      return;
    }
  };

  useEffect(() => {
    setNim(data?.NIM);
    setName(data?.Name);
    setAddress(data?.Address);
  }, [data]);
  return (
    <Modal
      title="Edit Student"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={'NIM *'}
        name="nim"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setNim(e.currentTarget.value)}
        value={nim}
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
        placeholder={'Address *'}
        name="address"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setAddress(e.currentTarget.value)}
        value={address}
      />
    </Modal>
  );
}

interface DeleteStudentProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Student | undefined;
}

function DeleteStudent({
  handleCloseModal,
  showModal,
  data,
}: DeleteStudentProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteStudent, { loading, error }] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Student deleted successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data?.NIM === undefined) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    deleteStudent({
      variables: {
        NIM: data.NIM,
      },
    });
    if (error) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal
      title="Delete Student"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <p className="text-center">Are you sure want to delete {data?.Name}?</p>
    </Modal>
  );
}
