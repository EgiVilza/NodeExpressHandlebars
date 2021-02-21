// Requiring our models
const db = require("../models")

// Routes
module.exports = (app) => {
    app.get('/api/burgers', (req,res) => {
        db.burgers.findAll({where: {devourStatus: false}}).then((results) => res.json(results))
    })

    app.post('/api/burgers', (req, res) => {
        db.burgers.create({
            name: req.body.name,
            devourStatus: req.body.devourStatus
        }).then((results) = res.json(results))
    })

    app.put('/api/burgers', (req, res) => {
        db.burgers.update(
            {
                devourStatus: req.body.devourStatus
            },
            {
                where: {
                    burger_id: req.body.burger_id
                }
            }
        ).then((results) = res.json(results))
    })
}
