import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [baseUrl, setBaseUrl] = useState<string>(''); // Set your base URL here
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    
    if (shortUrl) {
      setBaseUrl(window.location.origin); 
      const originalUrl = `${window.location.origin}/${shortUrl}`; 
      setUrl(originalUrl);
      console.log(baseUrl)
    }
  }, [shortUrl]);

  // Copy text to clipboard
  const copyText = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      console.log('Copied the text: ' + url);
    }
  };

  return (
    <div>
      <h1>URL Shortener Microservice</h1>
      <main>
        <section>
          <fieldset>
            <legend>YOUR SHORTENED URL:</legend>
            <label htmlFor="url_input"></label>
            <p id="short-url">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              ) : (
                'Not found'
              )}
            </p>
            <button className="copyBtn" onClick={copyText}>
              Copy to clipboard!
            </button>
            <button className="copyBtn" onClick={() => window.location.href = '/'}>
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
};

export default ResultPage;
