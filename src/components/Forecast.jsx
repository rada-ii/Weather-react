import React from "react";

function Forecast({ weather }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6 mb-8">
        <p className="text-white font-medium uppercase">{weather}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 PM</p>
          <img
            src="https://www.freeiconspng.com/uploads/sun-icon-0.png"
            // width="100"
            alt="Sun Icon Vector"
            className="w-12 my-1"
          />
          <p className="font-medium">34°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 PM</p>
          <img
            src="https://www.freeiconspng.com/uploads/sun-icon-0.png"
            // width="100"
            alt="Sun Icon Vector"
            className="w-12 my-1"
          />
          <p className="font-medium">34°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 PM</p>
          <img
            src="https://www.freeiconspng.com/uploads/sun-icon-0.png"
            // width="100"
            alt="Sun Icon Vector"
            className="w-12 my-1"
          />
          <p className="font-medium">34°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 PM</p>
          <img
            src="https://www.freeiconspng.com/uploads/sun-icon-0.png"
            // width="100"
            alt="Sun Icon Vector"
            className="w-12 my-1"
          />
          <p className="font-medium">34°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 PM</p>
          <img
            src="https://www.freeiconspng.com/uploads/sun-icon-0.png"
            // width="100"
            alt="Sun Icon Vector"
            className="w-12 my-1"
          />
          <p className="font-medium">34°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 PM</p>
          <img
            src="https://www.freeiconspng.com/uploads/sun-icon-0.png"
            // width="100"
            alt="Sun Icon Vector"
            className="w-12 my-1"
          />
          <p className="font-medium">34°</p>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
