import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Wrapper } from ".";
import { DatePickerProps } from "../../../interfaces";

export const DatePicker = ({
  onDateChange,
  label,
  className,
}: DatePickerProps) => {
  const [date, setDate] = useState("");
  const handleDateChagne = (date: string) => {
    setDate(date);
    onDateChange(date);
  };
  return (
    <Wrapper className={className}>
      <label>{label}:</label>
      <Form.Control
        type="date"
        name="datepic"
        placeholder="DateRange"
        value={date}
        onChange={(e) => handleDateChagne(e.target.value)}
      />
    </Wrapper>
  );
};
