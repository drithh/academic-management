import type { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Table, { fuzzySort } from './tables/Table';
import ActionColumn from './tables/ActionColumn';
import Modal from './Modal';
import Input from './Input';
import { useQuery, gql, useMutation } from '@apollo/client';
import { graphql } from '../gql';
import type { Lecturer } from '../gql/types';
import { toast } from 'react-hot-toast';

const GET_LECTURERS = graphql(/* GraphQL */ `
  query GetLecturer {
    lecturers {
      NIP
      Name
      Address
    }
  }
`);

const CREATE_LECTURER = graphql(/* GraphQL */ `
  mutation CreateLecturer($input: LecturerInput!) {
    createLecturer(input: $input) {
      NIP
      Name
      Address
    }
  }
`);

const UPDATE_LECTURER = graphql(/* GraphQL */ `
  mutation UpdateLecturer($input: LecturerInput!) {
    updateLecturer(input: $input) {
      NIP
      Name
      Address
    }
  }
`);

const DELETE_LECTURER = graphql(/* GraphQL */ `
  mutation DeleteLecturer($NIP: String!) {
    deleteLecturer(NIP: $NIP) {
      NIP
      Name
      Address
    }
  }
`);

export default function Lecturer() {
  const [showAddLecturerModal, setShowAddLecturerModal] = useState(false);
  const [showEditLecturerModal, setShowEditLecturerModal] = useState(false);
  const [currentLecturer, setCurrentLecturer] = useState<Lecturer>();
  const [showDeleteLecturerModal, setShowDeleteLecturerModal] = useState(false);

  const [data, setData] = React.useState<Lecturer[]>();

  const { loading, error, data: dataQuery } = useQuery(GET_LECTURERS);

  const handleAddLecturer = () => {
    setShowAddLecturerModal(true);
  };

  const handleCloseAddLecturerModal = () => {
    setShowAddLecturerModal(false);
  };

  const handleEditLecturer = (data: Lecturer) => {
    setCurrentLecturer(data);
    setShowEditLecturerModal(true);
  };

  const handleCloseEditLecturerModal = () => {
    setShowEditLecturerModal(false);
  };

  const handleDeleteLecturer = (data: Lecturer) => {
    setCurrentLecturer(data);
    setShowDeleteLecturerModal(true);
  };

  const handleCloseDeleteLecturerModal = () => {
    setShowDeleteLecturerModal(false);
  };

  const columns = React.useMemo<ColumnDef<Lecturer, any>[]>(
    () => [
      {
        accessorKey: 'NIP',
        header: () => 'Nip',
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
      ...ActionColumn<Lecturer>(handleEditLecturer, handleDeleteLecturer),
    ],
    []
  );

  useEffect(() => {
    if (dataQuery?.lecturers) {
      const lecturers = dataQuery.lecturers as Lecturer[];
      setData(lecturers);
    }
  }, [dataQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;
  if (data === undefined) return <p>Not found</p>;

  return (
    <>
      <AddLecturer
        handleCloseModal={handleCloseAddLecturerModal}
        showModal={showAddLecturerModal}
      />
      <EditLecturer
        data={currentLecturer}
        handleCloseModal={handleCloseEditLecturerModal}
        showModal={showEditLecturerModal}
      />
      <DeleteLecturer
        data={currentLecturer}
        handleCloseModal={handleCloseDeleteLecturerModal}
        showModal={showDeleteLecturerModal}
      />

      <Table data={data} columns={columns} handleAddData={handleAddLecturer} />
    </>
  );
}

interface AddLecturerProps {
  handleCloseModal: () => void;
  showModal: boolean;
}

function AddLecturer({ handleCloseModal, showModal }: AddLecturerProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [nip, setNip] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addLecturer, { data, loading, error }] = useMutation(CREATE_LECTURER, {
    refetchQueries: [{ query: GET_LECTURERS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Lecturer added successfully');
      closeModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nip === '' || name === '' || address === '') {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    addLecturer({
      variables: {
        input: {
          NIP: nip,
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
    setNip('');
    setName('');
    setAddress('');
    handleCloseModal();
  };

  return (
    <Modal
      title="Add Lecturer"
      showModal={showModal}
      error={errorMsg}
      handleCloseModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={'NIP *'}
        name="nip"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setNip(e.currentTarget.value)}
        value={nip}
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

interface EditLecturerProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Lecturer | undefined;
}

function EditLecturer({
  handleCloseModal,
  showModal,
  data,
}: EditLecturerProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [nip, setNip] = useState(data?.NIP);
  const [name, setName] = useState(data?.Name);
  const [address, setAddress] = useState(data?.Address);

  const [editLecturer, { loading, error }] = useMutation(UPDATE_LECTURER, {
    refetchQueries: [{ query: GET_LECTURERS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Lecturer updated successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nip === undefined || name === undefined || address === undefined) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    editLecturer({
      variables: {
        input: {
          NIP: nip,
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
    setNip(data?.NIP);
    setName(data?.Name);
    setAddress(data?.Address);
  }, [data]);
  return (
    <Modal
      title="Edit Lecturer"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={'NIP *'}
        name="nip"
        required
        extraClass={`w-full focus:border-gray-500 mb-4 ${
          errorMsg ? 'border-red-300' : ''
        }`}
        border="border-2 border-gray-300 mb-4"
        onChange={(e) => setNip(e.currentTarget.value)}
        value={nip}
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

interface DeleteLecturerProps {
  handleCloseModal: () => void;
  showModal: boolean;
  data: Lecturer | undefined;
}

function DeleteLecturer({
  handleCloseModal,
  showModal,
  data,
}: DeleteLecturerProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteLecturer, { loading, error }] = useMutation(DELETE_LECTURER, {
    refetchQueries: [{ query: GET_LECTURERS }],
    onError: (error) => {
      toast.error(error.message);
      setErrorMsg(error.message);
    },
    onCompleted: () => {
      toast.success('Lecturer deleted successfully');
      handleCloseModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data?.NIP === undefined) {
      setErrorMsg('Please fill all the required fields');
      return;
    }

    deleteLecturer({
      variables: {
        NIP: data.NIP,
      },
    });
    if (error) {
      return;
    }

    handleCloseModal();
  };

  return (
    <Modal
      title="Delete Lecturer"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <p className="text-center">Are you sure want to delete {data?.Name}?</p>
    </Modal>
  );
}
