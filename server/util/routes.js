const Router = require('express')
const messages = require('@controllers/messagesController')
const people = require('@controllers/peopleController')

const router = Router()

router.get('/messages', messages.getAll)
router.post('/messages', messages.create)
router.delete('/messages/:id', messages.destroy)

router.get('/persons/:id', people.getPerson)
router.delete('/persons/:id', people.destroy)
router.put('/persons/:id', people.update)
router.post('/persons', people.create)
router.get('/persons', people.getAll)
router.get('/info', people.getInfo)

module.exports = router
