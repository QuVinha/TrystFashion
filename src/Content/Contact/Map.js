import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import GhimIcon from "../../assets/img/GhimIcon.png";

const containerStyle = {
  width: "100%",
  height: "550px",
  position: "relative",
};

const storeLocation = {
  lat: 21.01155,
  lng: 105.83044,
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBqIm1BH4Z2iXUobBw9w98dpCIIyRLP-QE",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Tạo URL cho Google Maps
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`;
  };

  return isLoaded ? (
    <div style={containerStyle}>
      {/* Thông tin cố định trên góc bản đồ */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1",
          maxWidth: "290px",
          fontSize: "14px",
        }}
      >
        <h2 style={{ margin: "0" }}>Tryst Fashion Studio</h2>
        <p style={{ margin: "5px 0", color: "#5b5b5b" }}>
          21 Hồ Đắc Di, P. Nam Đồng, Đống Đa, Hà Nội, Việt Nam
        </p>
        <p style={{ margin: "5px 0" }}>5,0 ⭐⭐⭐⭐⭐ </p>
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1E90FF", cursor: "pointer" }}
        >
          Chỉ đường
        </a>
      </div>

      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={storeLocation}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={storeLocation}
          icon={{
            url: GhimIcon,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          title="Tryst Fashion Studio"
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapComponent);
