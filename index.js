// Bring in the express server and create the application
let express = require('express')
let app = express()

// Use the express router object
let router = express.Router()

// Create a GET 
router.get('/', function(req, res, next) {
    res.send("this is a test")
}) 

// Configure router so that all routes are prefixed with /api/
app.use('/api/', router)

// Create server to listen on port 3000
var server = app.listen(3000, function(){
    console.log('Node server is running on http://localhost:3000...')
})

