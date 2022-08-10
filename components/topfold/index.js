import React, { useState } from "react";
import cities from "../../lib/city.list.json";
import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);
    // console.log(query);
    let matchingCities = [];
    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());
        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      }
    }
    setResults(matchingCities);
    //console.log(results);
  };
  return (
    <div className="search">
      <input type="text" onChange={(e) => handleSearch(e)} value={query} />
      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li key={city.slug}>
                <Link href={`/location/${city.slug}`}>
                  <a>
                    {city.name}
                    {city.state ? `${city.state}` : " "}
                    <span>({city.country})</span>
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;