import { useState, useEffect } from "react";
import axios from "axios";

const useApiRequest = (url, method = "get", initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestData) => {
    setLoading(true);
    try {
      let response;
      switch (method.toLowerCase()) {
        case "get":
          response = await axios.get(url);
          break;
        case "post":
          response = await axios.post(url, requestData);
          break;
        case "put":
          response = await axios.put(url, requestData);
          break;
        case "delete":
          response = await axios.delete(url);
          break;
        default:
          throw new Error(`Unsupported request method: ${method}`);
      }
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendRequest();
  }, [url, method]);

  return { data, loading, error, sendRequest };
};

export default useApiRequest;
