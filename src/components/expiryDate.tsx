import React from "react";
import { TextField, FormControl, TextFieldProps } from "@mui/material";

const applyExpiryDateMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 5);
};

interface ExpiryDateInputProps extends Omit<TextFieldProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const ExpiryDateInput: React.FC<ExpiryDateInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleExpiryDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maskedExpiryDate = applyExpiryDateMask(event.target.value);
    onChange(maskedExpiryDate);
  };

  return (
    <FormControl className="flex w-full" variant="outlined">
      <TextField
        {...props}
        label="Vencimento"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleExpiryDateChange}
        inputProps={{ maxLength: 5 }}
      />
    </FormControl>
  );
};

export default ExpiryDateInput;
