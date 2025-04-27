import { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";

const options = [
  { id: 1, name: "United States" },
  { id: 2, name: "Russia" },
  { id: 3, name: "Qatar" },
  { id: 4, name: "Australia" },
];

const CountrySelect = () => {
  const [selectedOptions, setSelectedOptions] = useState(options[0]);
  return (
    <div>
      <Listbox value={selectedOptions} onChange={setSelectedOptions}>
        <Listbox.Button className="country-btn">
          <span className="d-flex gap-2  align-items-center justify-content-between w-100">
            <span className="d-flex flex-wrap justify-content-between gap-2 w-100">
              <span className="amount-tag">{selectedOptions.name}</span>
              <i className="bi bi-chevron-down"></i>
            </span>
          </span>
        </Listbox.Button>
        <Listbox.Options className="country-menu">
          {options.map((option) => (
            <Listbox.Option key={option.id} value={option} as={Fragment}>
              {({ active }) => (
                <li
                  className={`${
                    active ? "selectOption text-white" : ""
                  } selectOptionCountry`}
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

export default CountrySelect;
