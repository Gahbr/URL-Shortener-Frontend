import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RedirectPage = () => {
  const { shortenedlink } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const apiUrl = import.meta.env.VITE_URL_SHORTENER_API_URL;

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${shortenedlink}`);
        
        if (response.status === 200) {
          const originalUrl = response.data.originalUrl;
          console.log("Redirecting to:", originalUrl);

          window.location.href = originalUrl;
        } else if(response.status === 404) {
          setError("Shortened URL not found.");

        }else {
          setError("Failed to retrieve the original URL.");
        }
      } catch (err) {
        console.error(err)
        setError("An error occurred while fetching the URL.");
      } finally {
        setLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [shortenedlink, apiUrl]);

  if (loading) return <div>Loading...</div>;

  if (error && error.includes("Shortened URL not found.")) {
    return (
      <div>
        <h1>URL Shortener Microservice</h1>
        <main>
          <section>
            <fieldset>
              <legend>INVALID LINK</legend>
              <label htmlFor="url_input"></label>
              <p id="short-url">ERROR GETTING SHORTENED URL</p>
              <button className="copyBtn" onClick={() => navigate("/")}>
                Back to home
              </button>
            </fieldset>
          </section>
        </main>
        <footer>
          <p>
            By <a href="https://github.com/Gahbr" target="_blank" rel="noopener noreferrer">Gahbr</a>
          </p>
        </footer>
      </div>
    );
  }

  return null;
};

export default RedirectPage;
