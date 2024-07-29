import React from "react";
import { TextField, FormControl, TextFieldProps } from "@mui/material";

const applyCardMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};

interface CreditCardInputProps extends Omit<TextFieldProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const CreditCardInput: React.FC<CreditCardInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCard = applyCardMask(event.target.value);
    onChange(maskedCard);
  };

  return (
    <FormControl className="flex w-full" variant="outlined">
      <TextField
        {...props}
        label="Número do cartão"
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleCardChange}
        inputProps={{ maxLength: 19 }}
      />
    </FormControl>
  );
};

export default CreditCardInput;
