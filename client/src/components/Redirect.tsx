import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const endpoint = process.env.URL_ENDPOINT || 'http://localhost:8800';

const Redirect = () => {
  const { code } = useParams();
  const [originalUrl, setOriginalUrl] = useState('');

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(endpoint + `/api/urlshort/${code}`);
        const originalUrl = response.data.originalUrl;
        setOriginalUrl(originalUrl);
      } catch (error) {
        console.error('Error while fetching original URL:', error);
      }
    };

    fetchOriginalUrl();
  }, [code]);

  useEffect(() => {
    if (originalUrl) {
      window.location.href = originalUrl;
    }
  }, [originalUrl]);

  return null;
};

export default Redirect;
