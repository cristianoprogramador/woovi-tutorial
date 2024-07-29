import React from "react";
import { TextField, FormControl, TextFieldProps } from "@mui/material";

const applyCvvMask = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 3);
};

interface CvvInputProps extends Omit<TextFieldProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const CvvInput: React.FC<CvvInputProps> = ({ value, onChange, ...props }) => {
  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCvv = applyCvvMask(event.target.value);
    onChange(maskedCvv);
  };

  return (
    <FormControl className="flex w-full" variant="outlined">
      <TextField
        {...props}
        label="CVV"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleCvvChange}
        inputProps={{ maxLength: 3 }}
      />
    </FormControl>
  );
};

export default CvvInput;
