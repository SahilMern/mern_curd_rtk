"use client"
import React, { useState } from "react";

const countriesData = {
  India: ["Maharashtra", "Delhi", "Karnataka"],
  USA: ["California", "Texas", "New York"],
};

const CountryStateSelector = () => {
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setStates(countriesData[selectedCountry] || []);
    setSelectedState(""); // Reset state when country changes
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div>
      {/* Country Select Box */}
      <select value={country} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {Object.keys(countriesData).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Select Box */}
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!country}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryStateSelector;
