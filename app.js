/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */


// Your code here
const {HairColor} = require('./models')

const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const express = require('express')

const app = express()

// csurf protection
const csrfProtection = csrf({ cookie: true })
app.use(express.urlencoded({ extended: false }))

const port = 8081

app.set('view engine', 'pug')

app.get('/new-person', async (req, res) => {

  console.log('hairColor Model', HairColor)

  const hairColors = await HairColor.findAll()

  console.log('fetched hairColor', hairColors)

  res.render('new-person', { hairColors })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}