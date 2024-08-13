import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ListItems, Wrapper } from ".";
import { useCallback, useState } from "react";
import { DropDownProps } from "../../../interfaces/ui";

export const DropDown = ({ items, onItemChange }: DropDownProps) => {
  const [source, setSelectedSource] = useState("Sources");

  const handleSelectedSource = useCallback((source: string) => {
    setSelectedSource(source);
    onItemChange(source);
  }, []);

  return (
    <Wrapper>
      <DropdownButton id="dropdown-item-button" title={source}>
        <ListItems>
          {items?.map(({ label, value }) => (
            <Dropdown.Item
              key={value}
              onClick={() => handleSelectedSource(value)}
              as="button"
            >
              {label}
            </Dropdown.Item>
          ))}
        </ListItems>
      </DropdownButton>
    </Wrapper>
  );
};
