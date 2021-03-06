import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import PropTypes from 'prop-types';


const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapContainer({ lat, lng }) {
  const center = { lat, lng };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    />
  );
}

MapContainer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default React.memo(MapContainer);
