import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ListItems, LoadingContainer, Wrapper } from ".";
import { useCallback, useState } from "react";
import { DropDownProps } from "../../../interfaces/ui";

export const DropDown = ({
  items,
  loading,
  title,
  onItemChange,
}: DropDownProps) => {
  const [source, setSelectedSource] = useState(title);

  const handleSelectedItem = useCallback((value: string) => {
    setSelectedSource(value);
    onItemChange(value);
  }, []);

  const Component = loading ? (
    <LoadingContainer>Loading...</LoadingContainer>
  ) : !items ? (
    <ListItems>No Date Found</ListItems>
  ) : (
    <ListItems>
      {items?.map(({ label, value }) => (
        <Dropdown.Item
          key={value}
          onClick={() => handleSelectedItem(value)}
          as="button"
        >
          {label}
        </Dropdown.Item>
      ))}
    </ListItems>
  );

  return (
    <Wrapper>
      <DropdownButton id="dropdown-item-button" title={source}>
        {Component}
      </DropdownButton>
    </Wrapper>
  );
};
