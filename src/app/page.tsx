"use client";

import { parcelOptions } from "@/utils/mock";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Image from "next/image";
import { useState } from "react";

const CustomUncheckedIcon = () => {
  return (
    <div className="w-6 h-6 mr-4 mt-1 rounded-full flex items-center justify-center border-2 border-gray-300 transition duration-150 ease-in-out" />
  );
};

const CustomCheckedIcon = () => {
  return (
    <div className="w-6 h-6 mr-4 mt-1 rounded-full flex items-center justify-center border-2 bg-[#03D69D] border-[#03D69D] transition duration-150 ease-in-out">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
};

export default function HomePage() {
  const [checked, setChecked] = useState<string | null>(null);
  const secondArray = parcelOptions.slice(1);

  const handleToggle = (id: string) => () => {
    if (checked === id) {
      setChecked(null);
    } else {
      setChecked(id);
    }
  };

  const getClassNames = (
    index: number,
    parcelOptionsLength: number,
    checked: string | null,
    valueId: string,
    parcelOptions: { id: any }[]
  ) => {
    const borderClass =
      checked === valueId ? "border-[#03D69D]" : "border-gray-300";
    const roundClass =
      index === 0
        ? "rounded-t-lg border-t-2"
        : index === parcelOptionsLength - 1
        ? "rounded-b-lg border-b-2"
        : "border-x-2 rounded-none";
    const lineClass =
      index === 0
        ? "hidden"
        : checked === parcelOptions[index].id ||
          checked === parcelOptions[index - 1].id
        ? "bg-[#03D69D]"
        : "bg-gray-200";
    return { borderClass, roundClass, lineClass };
  };

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
          João, como você quer pagar?
        </div>

        <div className="w-[90%] max-w-[430px]">
          <List dense className="relative" sx={{ width: "100%", marginTop: 3 }}>
            <div className="absolute -top-1 z-10 left-5 bg-[#E5E5E5] px-4 py-[1px] rounded-full font-extrabold">
              Pix
            </div>
            {[parcelOptions[0]].map((value) => {
              return (
                <ListItem key={value.id} disablePadding>
                  <ListItemButton
                    onClick={handleToggle(value.id)}
                    sx={{ padding: 0 }}
                  >
                    <div
                      className={`flex flex-col w-full p-5 border-2 border-t-2 rounded-lg ${
                        checked === value.id
                          ? "border-[#03D69D]"
                          : "border-gray-200"
                      } `}
                    >
                      <div className="absolute top-3 right-3">
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value.id)}
                          checked={checked === value.id}
                          icon={<CustomUncheckedIcon />}
                          checkedIcon={<CustomCheckedIcon />}
                        />
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-1 text-2xl">
                          <div className="font-extrabold">
                            {value.installments}x
                          </div>
                          <div className="font-semibold">{value.total}</div>
                        </div>
                      </div>

                      <div className="text-[#03D69D] font-semibold">
                        <div className="gap-1 flex flex-row">
                          Ganhe
                          <span className="font-extrabold">
                            {value.cashback}
                          </span>
                          de Cashback
                        </div>
                      </div>

                      <div className="flex flex-row bg-[#133A6F] text-white font-semibold p-2 rounded-md mt-1 clip-corner text-sm gap-1">
                        🤑
                        <span className="font-extrabold">
                          {value.messageBold}
                        </span>
                        {value.message}
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <div>
            <List
              dense
              className="relative"
              sx={{ width: "100%", marginTop: 3 }}
            >
              <div className="absolute -top-1 z-10 left-5 bg-[#E5E5E5] px-4 py-[1px] rounded-full font-extrabold">
                Pix Parcelado
              </div>
              {secondArray.map((value, index) => {
                const { borderClass, roundClass, lineClass } = getClassNames(
                  index,
                  secondArray.length,
                  checked,
                  value.id,
                  secondArray
                );
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={handleToggle(value.id)}
                      sx={{ padding: 0 }}
                    >
                      <div
                        className={`flex w-full border-x-2 flex-col ${borderClass} ${roundClass}`}
                      >
                        <div className={`w-full h-[2px] ${lineClass} `} />
                        <div className="flex flex-col p-5">
                          <div className="absolute top-3 right-3">
                            <Checkbox
                              edge="end"
                              onChange={handleToggle(value.id)}
                              checked={checked === value.id}
                              icon={<CustomUncheckedIcon />}
                              checkedIcon={<CustomCheckedIcon />}
                            />
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row gap-1 text-2xl">
                              <div className="font-extrabold">
                                {value.installments}x
                              </div>
                              <div className="font-semibold">
                                {value.installmentAmount}
                              </div>
                            </div>
                          </div>

                          <div className="text-[#AFAFAF] font-semibold">
                            <div>Total: {value.total}</div>
                          </div>

                          {value.message && (
                            <div className="flex flex-row bg-[#133A6F] text-white font-semibold p-2 rounded-md mt-1 clip-corner text-sm gap-1">
                              <span className="font-extrabold">
                                {value.messageBold}{" "}
                              </span>
                              {value.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            <div className="flex flex-row justify-center gap-1 my-6 text-[#B2B2B2] text-sm">
              <div>
                <Image
                  src={"/shield.png"}
                  alt="shield"
                  width={16}
                  height={16}
                />
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
      </div>
    </main>
  );
}
