import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
const PORT = process.env.PORT || 4000;


const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  if(req.url === '/favicon.ico'){
    return;
  }
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
  let urlArray = req.url.split('?')
  let path = '';
  if(urlArray && urlArray.length> 1){
    path = path  +urlArray[1];
  }
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SpaceX-Missions</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <link rel="stylesheet" href="style.css">
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
