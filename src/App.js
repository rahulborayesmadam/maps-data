import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/map/Map";
import axios from "axios";

function App() {
  const center = {
    lat: 25.2048, //! Default Dubai Lat long
    lng: 55.2708,
  };

  const [branches, setBranches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);

  const getCompanyLocations = (id) => {
    axios
      .get(`https://fcssoftwares.com/api/CompanyProfile/GetOfficeByCPID/${id}`)
      .then((result) => {
        console.log(result?.data);
        setBranches(result?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompanyLocations(1);
  }, []);

  const data = branches && branches?.map((item) => item?.offices);
  const markersData = data && data?.flatMap((item) => item);

  const markers =
    markersData &&
    markersData?.map((branch, index) => ({
      id: index,
      name: branch?.branches?.address,
      position: {
        lat: parseFloat(branch?.branches?.lat),
        lng: parseFloat(branch?.branches?.long),
      },
      description: branch.address,
      country: branch?.branches?.address,
      email: branch?.branches?.email,
    }));

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    const filtered = markers.filter((marker) =>
      marker.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMarkers(filtered);
    if (filtered.length > 0) {
      setTimeout(() => {
        setMapCenter(filtered[0].position);
      }, 500);
    } else {
      setMapCenter(center);
    }
  };

  console.log("markersData", markers);
  return (
    <main className="main_container">
      <div className="store-list">
        <div className="heading">
          <h2>Our Locations</h2>
        </div>
        <div style={{ marginLeft: 10, marginRight: "10px" }}>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              marginBottom: "10px",
              gap: "10px",
            }}
          >
            <input
              placeholder="Search for branches"
              type="text"
              style={{
                width: "100%",
                padding: "8px",
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        {branches &&
          branches?.map((company) => (
            <ul className="list">{company?.nameEng}</ul>
          ))}

        {markers &&
          markers?.map((item) => (
            <ul className="list">
              <li>{item?.country}</li>
              <li>{item?.name}</li>
              <li>{item?.email}</li>
            </ul>
          ))}
      </div>

      <Map filteredMarkers={filteredMarkers} mapCenter={mapCenter} />
    </main>
  );
}

export default App;
