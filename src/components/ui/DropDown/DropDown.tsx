import { useState } from "react";
import { DropDownProps } from "../../../interfaces";
import { useOutsideClick } from "../../../utils/hooks";

export const DropDown = ({
  items,
  title,
  className,
  onItemChange,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState({ label: title, value: "" });

  const handleSelectedItem = (label: string, value: string) => {
    setSelectedItem({ label: label, value: value });
    onItemChange(value);
    setIsOpen(false);
  };

  const handleDropDownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const buttonRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={buttonRef}
    >
      <button
        onClick={handleDropDownToggle}
        type="button"
        className=" bg-softBlue flex justify-between rounded-md px-3 py-2 text-white"
      >
        {selectedItem.label}
        <svg
          className={`-mr-1 h-5 w-5 text-white ${isOpen ? "-rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          className="absolute left-0 z-10 mt-2 min-w-56 origin-top-right rounded-md bg-white shadow-lg max-h-[150px] overflow-y-scroll"
          tabIndex={-1}
        >
          {items?.map(({ label, value }) => (
            <li
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md"
              onClick={() => handleSelectedItem(label, value)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
