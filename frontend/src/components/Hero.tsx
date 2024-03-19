import React from "react";
import { items } from "../utils/heroData";

export const Hero: React.FC = () => {
  return (
    <div className="bg-gray-200 w-full p-10 flex flex-wrap gap-10 justify-center">
      {items.map((info) => {
        return (
          <div
            key={info.id}
            className="bg-white p-4 rounded flex flex-col gap-2 items-center"
          >
            <img src={info.img} alt="dress" className="rounded" />
            <div>
              <span>{info.sNo}</span> | <span>NRs. {info.price}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
