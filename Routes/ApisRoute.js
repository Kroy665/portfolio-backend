const express = require('express')
const router = express.Router()
const {valClientSchema} = require('../helpers/validation_schema')

const axios = require('axios');

// const app = express();
const mailer_helper = require('../helpers/mailer_helper');
router.post('/hireme', async (req, res, next) => {
    try {
        const result = await valClientSchema.validateAsync(req.body);
        console.log(result)
        const secret = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${result.token}`,)
        const {success} = response.data
        // console.log(success)
        if(success) {
            const email = result.email;
            const name = result.name;
            const message= result.message;

            const info = await mailer_helper({email,name,message})
            // console.log("info-2: ",info)
            if(info){
                return res.send({success: true, message: 'All Ok'})
            }else{
                return res.send({success: false, message: 'Email Cannot Send'})
            }
            
        }else{
            return res.status(400).json({error: 'ReCaptcha not varified...'})
        }
    
        
    } catch (error) {
        if (error.isJoi === true) {
            error.status = 422
        }
        next(error)
    }
})

router.get('/test', async (req, res, next)=>{
    try {
        res.send({"test":"Ok"})
    } catch (error) {
        next(error)
    }
})


module.exports = router