const express = require("express");
const { info, error } = require("./modules/my-log");
const { countries } = require("countries-list");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  let result = info("Hola Info Nodemon");
  res.send(result);
});

app.get("*", (req, res) => {
  res.status(404).send("Not found!");
});

/*
const server = http.createServer((request, response) => {
  const parsed = url.parse(request.url);
  const pathname = parsed.pathname;
  const query = querystring.parse(parsed.query);

  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>HOME PAGE</p></body></html>");
    response.end();
  } else if (pathname === "/exit") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>BYE</p></body></html>");
    response.end();
  } else if (pathname === "/info") {
    let result = info(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  } else if (pathname === "/country") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname === "/error") {
    let result = error(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<html><body><p>NOT FOUND</p></body></html>");
    response.end();
  }
});
*/

app.listen(4000, () => console.log("Running on 4000"));
