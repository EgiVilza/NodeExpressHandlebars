// Requiring our models
const db = require("../models")

// Routes
module.exports = (app) => {
    app.get('/api/burgers', (req,res) => {
        db.burgers.findAll({}).then((results) => res.json(results))
    })

    app.post('/api/burgers', (req, res) => {
        db.burgers.create({
            name: req.body.text
        })
    })
}