"use client";

import { SetStateAction, useEffect, useState } from "react";
import { parcelOptions } from "@/utils/mock";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import VerticalLineChecked from "@/components/verticalLineChecked";
import CpfInput from "@/components/cpfInput";
import CreditCardInput from "@/components/creditCard";
import ExpiryDateInput from "@/components/expiryDate";
import CvvInput from "@/components/cvv";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreIcon = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FormCreditCardPage = () => {
  const [id, setId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const router = useRouter();

  const [cpf, setCpf] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [parcela, setParcela] = useState("");

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCopyQRCODE = () => {
    const url = "https://www.youtube.com/channel/UCsxEJaQnDvadd2TIBmc58Aw";
    navigator.clipboard.writeText(url).then(() => {
      setIsCopy(true);
    });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    setId(id);
  }, []);

  const option = parcelOptions.find((option) => option.id === id);

  const handleNextPage = () => {
    if (isCopy) {
      router.push(`/form-credit-card?id=${option?.id}`);
    }
  };

  const handleChangeParcelas = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setParcela(event.target.value);
  };

  if (!id) {
    return <div>Carregando...</div>;
  }

  if (!option) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mt-9">
          <Image
            src={"/logo-woovi.png"}
            alt="logo-woovi"
            width={124}
            height={37}
          />
        </div>
        <div className="font-extrabold mt-10 text-2xl text-center">
          João, pague o restante em {option.installments - 1}x no cartão
        </div>

        <div className="w-[90%] max-w-[430px] flex flex-col justify-center items-center">
          <div className="mt-6 w-full flex flex-col gap-5">
            <FormControl className="flex w-full" variant="outlined">
              <TextField
                id="nome-completo"
                label="Nome Completo"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <CpfInput value={cpf} onChange={setCpf} />
            <CreditCardInput value={cardNumber} onChange={setCardNumber} />
            <div className="flex flex-row gap-4">
              <ExpiryDateInput value={expiryDate} onChange={setExpiryDate} />
              <CvvInput value={cvv} onChange={setCvv} />
            </div>
            <FormControl className="flex w-full" variant="outlined">
              <InputLabel id="parcelas">Parcelas</InputLabel>
              <Select
                id="parcelas"
                labelId="parcelas"
                value={parcela}
                onChange={handleChangeParcelas}
                label="Parcelas"
                fullWidth
              >
                <MenuItem key={option.id} value={option.id}>
                  {option.installments - 1}x de {option.installmentAmount}
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Button
            onClick={handleCopyQRCODE}
            sx={{
              textTransform: "none",
              backgroundColor: "#133A6F",
              "&:hover": {
                backgroundColor: "#1e54a0",
              },
              minWidth: "100%",
              color: "#ffff",
              marginTop: 2,
            }}
            className="py-2 font-semibold text-lg flex flex-row gap-3 rounded-md"
          >
            Pagar
          </Button>

          <div className="mt-4">
            <div className="text-[#B2B2B2]">Prazo de pagamento:</div>
            <div className="text-[#4D4D4D] font-extrabold">
              15/12/2021 - 08:17
            </div>
          </div>

          <div className="flex w-full mt-4">
            <VerticalLineChecked
              installments={option.installments}
              instalmmentAmount={option.installmentAmount}
            />
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-3" />

          <div className="flex flex-row w-full justify-between items-center font-semibold">
            <div>CET: 0,5%</div>
            <div className="text-lg">{option.total}</div>
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-3" />

          <div className="w-full">
            <div
              onClick={handleExpand}
              className="flex flex-row justify-between items-center w-full"
            >
              <div className="font-extrabold">Como Funciona?</div>
              <ExpandMoreIcon expand={expanded}>
                <ExpandMore />
              </ExpandMoreIcon>
            </div>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ marginTop: 1 }}>
                <div className="text-justify text-sm">
                  Para concluir o pagamento, primeiro pague a entrada de R${" "}
                  {option.installmentAmount} pelo Pix. Após a confirmação do
                  pagamento, o restante será parcelado no seu cartão de crédito
                  em {option.installments} vezes de R${" "}
                  {option.installmentAmount} cada.
                </div>
              </Box>
            </Collapse>
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-3" />

          {isCopy && (
            <div className="flex w-full justify-center items-center mt-3">
              <Button
                onClick={handleNextPage}
                className="bg-blue-700 text-white"
              >
                Continue to next page
              </Button>
            </div>
          )}

          <div className="flex flex-col justify-center items-center">
            <div className="text-[#B2B2B2] text-sm">Indentificador:</div>
            <div className="font-extrabold">{option.id}</div>
          </div>

          <div className="flex flex-row justify-center gap-1 my-6 text-[#B2B2B2] text-sm">
            <div>
              <Image src={"/shield.png"} alt="shield" width={16} height={16} />
            </div>
            <div className="text-center flex mt-[1px]">
              Pagamento 100% seguro via:
            </div>
            <div>
              <Image
                src={"/logo-woovi-gray.png"}
                alt="gray-logo"
                width={57}
                height={17}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormCreditCardPage;
