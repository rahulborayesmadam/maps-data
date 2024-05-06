import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

const Map = ({ filteredMarkers, mapCenter, markers, handleMarkerClick }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapContainerStyle = {
    height: "100vh",
    width: "100%",
  };

  const handleMarkerClickLocal = (marker) => {
    setSelectedMarker(marker);
    handleMarkerClick(marker);
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
          zoom={7}
        >
          {(filteredMarkers.length > 0 ? filteredMarkers : markers).map(
            (marker) => (
              <MarkerF
                key={marker.id}
                position={marker.position}
                onClick={() => handleMarkerClickLocal(marker)}
              >
                {selectedMarker?.id === marker?.id && (
                  <InfoWindow
                    position={marker.position}
                    onCloseClick={handleInfoWindowClose}
                  >
                    <div>
                      <h4>{marker.name}</h4>
                      <p>{marker.description}</p>
                      <p>{marker?.email}</p>
                      <p>{(marker?.position?.lat, marker?.position?.lng)}</p>
                    </div>
                  </InfoWindow>
                )}
              </MarkerF>
            )
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
