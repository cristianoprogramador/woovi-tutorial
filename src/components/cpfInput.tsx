import React from "react";
import { TextField, FormControl, TextFieldProps } from "@mui/material";

const applyCpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

interface CpfInputProps extends Omit<TextFieldProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const CpfInput: React.FC<CpfInputProps> = ({ value, onChange, ...props }) => {
  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCpf = applyCpfMask(event.target.value);
    onChange(maskedCpf);
  };

  return (
    <FormControl className="flex w-full" variant="outlined">
      <TextField
        {...props}
        label="CPF"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleCpfChange}
        inputProps={{ maxLength: 14 }}
      />
    </FormControl>
  );
};

export default CpfInput;
