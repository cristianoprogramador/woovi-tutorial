import { v4 as uuidv4 } from "uuid";

export const parcelOptions = [
  {
    id: uuidv4(),
    installments: 1,
    installmentAmount: "R$ 30.500,00",
    total: "R$ 30.500,00",
    messageBold: "R$ 300,00",
    cashback: "3%",
    message: "de volta no seu Pix na hora",
  },
  {
    id: uuidv4(),
    installments: 2,
    installmentAmount: "R$ 15.300,00",
    total: "R$ 30.600,00",
  },
  {
    id: uuidv4(),
    installments: 3,
    installmentAmount: "R$ 10.196,66",
    total: "R$ 30.620,00",
  },
  {
    id: uuidv4(),
    installments: 4,
    installmentAmount: "R$ 7.725,00",
    total: "R$ 30.900,00",
    messageBold: "-3% de juros:",
    message: "Melhor opção de parcelamento",
  },
  {
    id: uuidv4(),
    installments: 5,
    installmentAmount: "R$ 6.300,00",
    total: "R$ 31.500,00",
  },
  {
    id: uuidv4(),
    installments: 6,
    installmentAmount: "R$ 5.283,33",
    total: "R$ 31.699,98",
  },
  {
    id: uuidv4(),
    installments: 7,
    installmentAmount: "R$ 4.542,85",
    total: "R$ 31.800,00",
  },
];
