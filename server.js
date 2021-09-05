const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors')
var cors = require('cors')

require('dotenv').config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const ApisRoute = require('./Routes/ApisRoute')
app.use('/api', ApisRoute);

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    // res.status(err.status || 500)
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});


const PORT = process.env.PORT || 5000 
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});