# nodejs-shortlink
Server to serve redirects from short, easy to read URLs to long ones.

## To try

`node main/app.js`

Then in a browser go to 

http://localhost:8080/goog

This will redirect you to google.com.

## Short URL store

The short URLs that can be sent to the server are stored in a plain text file that must be available via HTTP and can be configured with envionment variable 
URL_STORE and defaults to https://raw.githubusercontent.com/ragoncsa/nodejs-shortlink/main/test-data. The server re-reads the list every 2 seconds. 
Managing the list of URLs is not supported by this application.

## Redirects

The server redirects from the short URL (only the path is relevant the domain is not) defined in the store to the long URL. (Of course, ideally the domain is
a short.)
