import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

interface HallOfFameProps {
  address: string;
  score: number;
}

export default function Example() {
  const [open, setOpen] = useState(1);
  const [hallOfFameList, setHallOfFameList] = useState<HallOfFameProps[]>([
    {
      address: '0x16cC248E24B9883C5d6FBb21646fA0C27Cb599F4',
      score: 50000
    },
    {
      address: '0xbabaD228C66eA0066758Ec6e0E76Fa8205c56740',
      score: 25025
    },
    {
      address: '0xFcf06e39a2961E12F5e3DE9376F09Be9De3830d2',
      score: 10000
    }
  ])

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };


  return (
    <>
      <div className="shadow-2xl mt-12 w-1/3 p-4 container mx-auto rounded-md bg-gray-50 mb-10">
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Hall of Fame
          </AccordionHeader>
          <AccordionBody>
            {hallOfFameList.map((fame, index) => {
              return <div className="flex justify-between items-center h-16 border-b-2" key={fame.address}>
                <span className="text-xl text-gray-500">#{index}</span>
                <p className="text-lg flex flex-col">
                  <span className="text-sm text-gray-500">Address</span>
                  <span className="text-md">{fame.address}</span>
                </p>
                <p className="text-lg flex flex-col">
                  <span className="text-sm text-gray-500">Score</span>
                  <span>{fame.score}</span>
                </p>
              </div>
            })}
          </AccordionBody>
        </Accordion>
      </div>

    </>
  );
}