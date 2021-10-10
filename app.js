/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */


// Your code here
const {HairColor, Person} = require('./models')

const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const express = require('express')

const app = express()

// csurf protection
const csrfProtection = csrf({ cookie: true })
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

const port = 8081

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const people = await Person.findAll({
    include: HairColor
  })

  console.log(people)

  res.render('people', {people})
})

app.get('/new-person', csrfProtection, async (req, res) => {

  const hairColors = await HairColor.findAll()

  res.render('new-person', { hairColors, csrfToken: req.csrfToken() })
})

app.post('/new-person', csrfProtection, async (req, res, next) => {
  const { firstName, lastName, age, biography, hairColorId } = req.body

  try {
    await Person.create({
      firstName,
      lastName,
      age,
      biography,
      hairColorId
    })

    res.redirect('/')
  } catch (e) {
    next(e)
  }
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