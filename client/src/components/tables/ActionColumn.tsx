import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

export default function ActionColumn<T>(
  onEdit: (data: T) => void,
  onDelete: (data: T) => void
): ColumnDef<T, any>[] {
  return [
    {
      id: 'icon',
      header: 'Action',
      size: 10,
      cell: (cell) => (
        <div className="flex flex-row gap-x-2 place-content-center  text-gray-700">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            onClick={() => onEdit(cell.row.original)}
          >
            <HiOutlinePencil className=" text-2xl " />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            onClick={() => onDelete(cell.row.original)}
          >
            <HiOutlineTrash className=" text-2xl " />
          </button>
        </div>
      ),
    },
  ];
}
