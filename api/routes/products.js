const { Router } = require('express')

const router = Router()

// Mock Users
const products = []

/* GET users listing. */
router.get('/products', function (req, res, next) {
  res.json(users)
})

// /* GET user by ID. */
// router.get('/users/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router