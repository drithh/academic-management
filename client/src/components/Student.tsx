import type { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Table, { fuzzySort } from './Table';
import { BsFillTrashFill } from 'react-icons/bs';

export type Person = {
  nim: string;
  name: string;
  address: string;
};

const makeData = (len: number): Person[] => {
  return [...Array(len)].map(
    (d, i) =>
      ({
        nim: `M05200${i}`,
        name: `User ${i}`,
        address: `Address test test test test test test test test test test test test test test test test test ${i}`,
      } as Person)
  );
};
export default function Student() {
  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: 'nim',
        header: () => 'Nim',
        size: 30,
        footer: (props) => props.column.id,
      },
      {
        header: 'Name',
        footer: (props) => props.column.id,
        accessorKey: 'name',
        size: 30,
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'address',
        header: () => 'Address',
        enableResizing: true,
        size: 60,
        footer: (props) => props.column.id,
      },
      {
        id: 'icon',
        header: 'Action',
        size: 10,
        cell: ({ row }) => (
          <div className="flex flex-row gap-x-2 place-content-center">
            <BsFillTrashFill />
            <BsFillTrashFill />
          </div>
        ),
      },
    ],
    []
  );

  const [data, setData] = React.useState<Person[]>(() => makeData(500));

  return <Table data={data} columns={columns} />;
}
