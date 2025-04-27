import { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";

const options = [
  { id: 1, name: "New" },
  { id: 2, name: "Recent" },
  { id: 3, name: "Old" },
];

const SelectOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState(options[0]);
  return (
    <div>
      <Listbox value={selectedOptions} onChange={setSelectedOptions}>
        <Listbox.Button className="option-btn">
          <span className="d-flex gap-2  align-items-center justify-content-between w-100">
            <span className="d-flex flex-wrap justify-content-between gap-2">
              <span className="amount-tag">{selectedOptions.name}</span>
              <i className="bi bi-chevron-down"></i>
            </span>
          </span>
        </Listbox.Button>
        <Listbox.Options className="options-menu">
          {options.map((option) => (
            <Listbox.Option key={option.id} value={option} as={Fragment}>
              {({ active }) => (
                <li
                  className={`${
                    active ? "bg-success ps-2 rounded" : "ps-2 rounded"
                  }`}
                >
                  {option.name}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default SelectOptions;
