import { Heart } from "@phosphor-icons/react";
import React, { FC, useState, useEffect, useRef, KeyboardEvent } from "react";
import { airports } from '../../../settings/liveatc';

interface SelectAirportProps {
  airports: typeof airports;
  onSelect: (iata: string) => void;
}

export const SelectAirport: FC<SelectAirportProps> = ({ airports, onSelect }) => {
  const [filteredAirports, setFilteredAirports] = useState(airports);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
      setFilteredAirports(airports.filter(airport =>
        airport.name.toLowerCase().includes(query) ||
        airport.iata.toLowerCase().includes(query) ||
        airport.location.city.toLowerCase().includes(query) ||
        airport.location.country.toLowerCase().includes(query) ||
        airport.icao.toLowerCase().includes(query)
      ));
    } else {
      setFilteredAirports(airports);
    }
    setSelectedIndex(-1);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredAirports.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          onSelect(filteredAirports[selectedIndex].iata);
        }
        break;
    }
  }

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="rounded-xl p-3 px-4 w-full text-sm"
        placeholder="Enter Airport Name, Location, IATA, ICAO"
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />

      <div ref={listRef} className="overflow-y-auto">
        {filteredAirports.map((airport, index) => (
          <div
            key={airport.iata}
            className={`flex items-center px-4 py-4 border-b-2 hover:bg-slate-200 space-x-4 ${index === selectedIndex ? 'bg-slate-200' : ''}`}
          >
            <button>
              <Heart size={20} />
            </button>
            <div
              className="cursor-pointer flex-grow"
              onClick={() => onSelect(airport.iata)}
            >
              <div>{airport.name}</div>
              <div className="flex text-sm text-gray-700">
                <p>{airport.location.city}, {airport.location.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}