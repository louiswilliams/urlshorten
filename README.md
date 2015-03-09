Super lightweight url shortener
================================

Zero configuration url shortener and API

API
---
`GET /c/[:url]` (Create shortened url)

* Input

  * `url`: Input URL to shorten
  
* Output (JSON)

  * `hash`: Hash of the url

  * `url`: Shortened URL


`GET /g/[:hash]` (Decode hash)

* Input

  * `hash`: Input hash to get original URL
  
* Output (JSON)

  * `url`: Original URL


`GET /[:hash]` (Decode and redirect)

* Input

  * `hash`: Input hash to get original URL
  
* Output

  * Redirect to original URL


Install
-------
`npm install`

Deploy
------
Defaults to port `3003`. Modify in `server.js`

`npm start`