import React from "react";

function Search({ city, setCity, handleSearch, handleLocationWeather }) {
  return (
    <>
      <input
        type="text"
        placeholder="Enter city name..."
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="border border-gray-300 rounded px-4 py-2 mt-4 mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <button
        onClick={handleLocationWeather}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
      >
        Get My Location
      </button>
    </>
  );
}

export default Search;
