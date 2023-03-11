import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Button';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  title: string;
  error?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  children: React.ReactNode;
}

export default function Modal({
  showModal,
  title,
  handleCloseModal,
  error,
  handleSubmit,
  children,
}: Props) {
  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[999] overflow-y-auto"
        static
        open={showModal}
        onClose={handleCloseModal}
      >
        <div className="min-h-screen px-4 text-center font-body">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[rgba(107,114,128,0.4)]" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
              <button
                type="button"
                className="absolute right-4 top-3 p-1 rounded-full hover:bg-gray-200 outline-none focus:outline-none"
                onClick={handleCloseModal}
              >
                <IoCloseOutline className="text-3xl" />
              </button>
              <Dialog.Title
                as="h3"
                className="mb-6 mt-4 text-center text-4xl font-medium leading-6 text-gray-800 uppercase"
              >
                {title}
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-2">
                {children}

                {error !== '' && (
                  <div className="mb-4  text-sm text-red-600">{error}</div>
                )}

                <Button
                  type="submit"
                  value="Save Changes"
                  extraClass="w-full text-center text-xl mb-4"
                  size="lg"
                />
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
