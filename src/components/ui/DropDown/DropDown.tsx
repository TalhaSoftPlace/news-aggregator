import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ListItems, LoadingContainer, Wrapper } from ".";
import { useCallback, useState } from "react";
import { DropDownProps } from "../../../interfaces/ui";

export const DropDown = ({ items, loading, onItemChange }: DropDownProps) => {
  const [source, setSelectedSource] = useState("Sources");

  const handleSelectedSource = useCallback((source: string) => {
    setSelectedSource(source);
    onItemChange(source);
  }, []);

  const Component = loading ? <LoadingContainer>Loading...</LoadingContainer> : items && items.length <= 0 ? <ListItems>No Date Found</ListItems> : <ListItems>
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


  return (
    <Wrapper>
      <DropdownButton id="dropdown-item-button" title={source}>
        {Component}
      </DropdownButton>
    </Wrapper>
  );
};
