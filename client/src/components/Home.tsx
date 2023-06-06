import React, { useState } from "react";
import axios from "axios";

const endpoint = process.env.URL_ENDPOINT || 'https://url-shorten-u9h7.onrender.com/';

const Home = () => {
    const [longUrl, setlongUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(endpoint + 'api/urlshort', {longUrl});
            setShortenedUrl(response.data.shortUrl);
        } catch (error) {
            console.log("Error while creating shortening url:", error);
        }
    }

    return (
        <div>
            <h1>URL Shortener</h1>
            <form onSubmit={handlerSubmit}>
                <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setlongUrl(e.target.value)}
                    placeholder="Enter Url" 
                />
                <button type="submit">Shorten</button>
            </form>
            {shortenedUrl && (
                <div>
                    <h3>Shortend Url:</h3>
                    <a href={shortenedUrl}>{shortenedUrl}</a>
                </div>
            )}
        </div>
    )
}

export default Home;
