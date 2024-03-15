import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs() {
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          className="txl font-light p-2 focus:outline-none w-full shadow-xl capitalize"
          placeholder="Search..."
        />
        <UilSearch
          className=" text-white cursor-pointer transition ease-out hover:scale-125"
          size={25}
        />
        <UilLocationPoint
          className=" text-white cursor-pointer transition ease-out hover:scale-125"
          size={25}
        />
      </div>
      <div className="flex flow-row w-1/4 items-center justify-center">
        <button name="metric" className="text-xl  text-white font-light">
          &deg;C&nbsp;
        </button>
        <p className="text-white mx-1">|</p>
        <button name="imperial" className="text-xl  text-white font-light">
          &deg;F &nbsp;
        </button>
      </div>
    </div>
  );
}

export default Inputs;
