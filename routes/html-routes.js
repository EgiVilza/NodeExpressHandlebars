// Requiring our models
const db = require("../models")

// Routes
module.exports = (app) => {

    app.get("/", function(req, res) {
        res.json(path.join(__dirname, './public/index.html'));
    });
      
    //Finds all non-devoured burgers
    app.get('/api/burgers', (req,res) => {
        db.burgers.findAll({where: {devourStatus: false}}).then((results) => res.json(results))
    })

    //Post burger record
    app.post('/api/burgers', (req, res) => {
        db.burgers.create({
            name: req.body.name,
            devourStatus: req.body.devourStatus,
        }).then((results) => res.json(results))
    })

    //Update burger record
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
        ).then((results) => res.json(results))
    })
}
