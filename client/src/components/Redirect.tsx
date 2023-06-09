import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const endpoint = process.env.URL_ENDPOINT || 'https://url-shorten-u9h7.onrender.com';
console.log(endpoint, 'end');

const Redirect = () => {
  const { code } = useParams();
  const [originalUrl, setOriginalUrl] = useState('');

  useEffect(() => {
    console.log("hi")
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(endpoint + `/api/urlshort/${code}`);
        const originalUrl = response.data.url;
        console.log(originalUrl, 'url');
//         setOriginalUrl(originalUrl);
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
