import { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import { Wrapper } from ".";

export const DatePicker = ({
  onDateChange,
  label,
}: {
  onDateChange: (value: string) => void;
  label: string;
}) => {
  const [date, setDate] = useState("");
  const handleDateChagne = (date: string) => {
    setDate(date);
    onDateChange(date);
  };
  return (
    <Wrapper>
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
