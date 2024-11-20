import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FarmerContext = createContext();

export const FarmerProvider = ({ children }) => {
  const [farmerId, setFarmerId] = useState(null);

  return (
    <FarmerContext.Provider value={{ farmerId, setFarmerId }}>
      {children}
    </FarmerContext.Provider>
  );
};

FarmerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
