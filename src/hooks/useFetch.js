import { useState, useCallback } from "react";

const useFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig, dataHandler) => {

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {

          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,

        });
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();

        dataHandler(data);

      } catch (error) {

        setError(error.message || 'Something went wrong!');

      } finally {
          
        setIsLoading(false);

      }

    }, []);
  
    return {
      isLoading,
      error,
      sendRequest,
    };
  };
  
  export default useFetch;