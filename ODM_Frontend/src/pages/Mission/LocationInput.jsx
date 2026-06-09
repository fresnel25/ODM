import { useEffect, useRef, useState } from "react";
import { useLocationSearch } from "../../services/api/localisation/useLocationSearch";

const LocationInput = ({
  label,
  value = "",
  onSelect,
  placeholder = "Rechercher une ville, adresse...",
}) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const { results, loading } = useLocationSearch(query);
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatAddress = (address) => {
    return (
      address?.city ||
      address?.town ||
      address?.village ||
      address?.municipality ||
      address?.county ||
      ""
    );
  };

  const handleSelect = (item) => {
    const locationData = {
      adresse: formatAddress(item.address),
      pays: item.address?.country || "",
      latitude: Number(item.lat),
      longitude: Number(item.lon),
      fullLabel: item.display_name,
    };

    setQuery(item.display_name);
    setIsOpen(false);

    onSelect(locationData);
  };

  return (
    <div ref={containerRef} className="relative w-full">
     
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>


      <input
        type="text"
        className="input input-bordered w-full"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);

          if (val.trim().length >= 2) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
      />

      
      {loading && (
        <div className="absolute right-3 top-[42px]">
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-box border border-base-300 bg-base-100 shadow-xl max-h-72 overflow-y-auto">
          {results.map((item) => (
            <button
              key={`${item.lat}-${item.lon}`}
              type="button"
              className="w-full text-left px-4 py-3 hover:bg-base-200 transition"
              onClick={() => handleSelect(item)}
            >
              {/* ville / adresse complète */}
              <div className="font-medium line-clamp-1">
                {item.display_name}
              </div>

              {/* pays */}
              <div className="text-xs opacity-60">{item.address?.country}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
