import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';


const GoogleMap = ({ children, ...props }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: process.env.REACT_APP_MAP_KEY,
    }}
    zoom={12}
    {...props}
  >{children}
  </GoogleMapReact>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
