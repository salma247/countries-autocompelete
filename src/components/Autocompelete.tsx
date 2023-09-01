import { fetchCountries } from "../services/api";
import { useState, useEffect } from "react";

function Autocompelete() {
  const [countries, setCountries] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      setCountries(await fetchCountries());
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
        const matches = countries.filter((country) => {
            const regex = new RegExp(`^${search}`, "gi");
            return country.match(regex);
        });
        setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [search, countries]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setSuggestions([]);
  };

  const handleSelect = (value: string) => {
    setSearch(value);
    setSelectedCountry(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0 && search.length === 0) {
      return null;
    }

    if (suggestions.length === 0 && search.length !== 0) {
      return <p>No suggestions available...</p>;
    }

    return (
      <ul className="suggestions">
        {suggestions.map((country) => (
          <li
            key={country}
            onClick={() => handleSelect(country)}
            className="suggestion"
          >
            (country)
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Auto compelete search</h1>
      <div className="search-container">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
          placeholder="Search country"
          className="input"
        />
        {renderSuggestions()}
        {selectedCountry && <div>Selected country: {selectedCountry}</div>}
      </div>
    </div>
  );
}

export default Autocompelete;
