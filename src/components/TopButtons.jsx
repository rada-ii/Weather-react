import React from "react";

function TopButtons() {
  const cities = [
    {
      id: 1,
      name: "New York",
    },
    {
      id: 2,
      name: "Paris",
    },
    {
      id: 3,
      name: "London",
    },
    {
      id: 4,
      name: "Tokyo",
    },
    {
      id: 5,
      name: "Dubai",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6 cities">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium">
          {city.name}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
