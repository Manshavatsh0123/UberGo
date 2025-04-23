import { createContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchCaptainData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        setTimeout(() => {
          
          const fetchedCaptainData = {
            fullname: {
              firstname: 'John',
              lastname: 'Doe'
            }
          };
          setCaptain(fetchedCaptainData);
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        setError('Failed to fetch captain data');
        setIsLoading(false);
      }
    };

    fetchCaptainData();
  }, []); 

  const updateCaptain = (captainData) => {
    setCaptain((prevCaptain) => ({
      ...prevCaptain, 
      fullname: captainData.fullname 
    }));
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
