import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
const Map = ({ filteredMarkers, mapCenter }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <>
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
