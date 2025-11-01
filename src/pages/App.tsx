import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_URL_SHORTENER_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/shorturl`, { url: url });

      if (response.status === 200) {
        console.log("data", response.data);
        setShortenedUrl(response.data.short);
        navigate(`/result/${response.data.short}`);
      } else {
        throw new Error("Failed to shorten the URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>URL Shortener Microservice</h1>
      <small>Insert the URL you want to shorten.</small>
      <br />
      <small>
        When you visit <b style={{ color: "orangered" }}>/:shorturl:</b>, you
        will be redirected to the original URL.
      </small>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>URL Shortener</legend>
              <label htmlFor="url_input">URL:</label>
              <input
                id="url_input"
                type="text"
                name="url"
                placeholder="https://www.example.com/"
                required
                value={url}
                onChange={handleChange}
              />
              <input type="submit" value="SHORTEN URL" />
            </fieldset>
          </form>

          {shortenedUrl && (
            <div>
              <h2>Shortened URL</h2>
              <p>
                <a
                  href={shortenedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenedUrl}
                </a>
              </p>
            </div>
          )}
        </section>
      </main>
      <footer>
        <p>
          By{" "}
          <a
            href="https://github.com/Gahbr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gahbr
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
