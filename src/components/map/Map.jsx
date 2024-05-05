import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [branches, setBranches] = useState([]);

  const mapContainerStyle = {
    height: "96vh",
    width: "100%",
  };

  const center = {
    lat: 25.2048, //! Default Dubai Lat long
    lng: 55.2708,
  };

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
    }));

  console.log("markers", markers);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    const filtered = markers.filter((marker) =>
      marker.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("filtered", filtered);
    setFilteredMarkers(filtered);
    if (filtered.length > 0) {
      setTimeout(() => {
        setMapCenter(filtered[0].position);
      }, 500);
    } else {
      setMapCenter(center);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 40,
          gap: 20,
        }}
      >
        <input
          placeholder="Search for branches"
          type="text"
          style={{
            width: "14%",
            padding: "4px",
          }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyDU7VCnMXbqJgHGVsoHM4auKTUOpZI4I3Q">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={8}
        >
          {filteredMarkers.map((marker) => (
            <MarkerF
              key={marker.id}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
            >
              {selectedMarker === marker && (
                <InfoWindow
                  position={marker.position}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div>
                    <h4>{marker.name}</h4>
                    <p>{marker.description}</p>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
