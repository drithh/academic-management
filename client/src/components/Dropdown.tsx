import { Fragment, useState } from 'react';
import { HiChevronUpDown, HiOutlineCheck } from 'react-icons/hi2';
import { Combobox, Transition } from '@headlessui/react';

interface props<T> {
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  filterFunction: (query: string) => T[];
  getDisplayValue: (item: T) => string;
  z?: number;
}

function Dropdown<T>({
  selected,
  setSelected,
  filterFunction,
  getDisplayValue,
  z = 0,
}: props<T>) {
  const [query, setQuery] = useState('');
  const filteredItem = filterFunction(query);
  return (
    <div className="relative" style={{ zIndex: z }}>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative ">
          <div className="relative w-full focus:border-gray-500 mb-4 border-2 border-gray-300 outline-none cursor-default overflow-hidden bg-white ">
            <Combobox.Input
              className="w-full border-none py-3 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
              displayValue={(item: T) => getDisplayValue(item)}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute -mt-3 max-h-[20rem] overflow-hidden w-full  rounded-md bg-white py-1 text-base border border-black">
              {filteredItem.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItem.map((item, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {getDisplayValue(item)}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <HiOutlineCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default Dropdown;
