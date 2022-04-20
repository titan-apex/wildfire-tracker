import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const markers = eventData.map((e, index) => {
    if (e.categories[0].id === "wildfires") {
      return (
        <LocationMarker
          key={index}
          lat={e.geometry[0].coordinates[1]}
          lng={e.geometry[0].coordinates[0]}
          onClick={() => setLocationInfo({ id: e.id, title: e.title })}
        />
      );
    }

    return null;
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCtbIg9b8I0rGXk8tIMkNkbbFl34gzzFnQ" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 27.2046,
    lng: 77.4977,
  },
  zoom: 6,
};

export default Map;
