const express = require("express");
const router = express.Router();
const { valClientSchema } = require("../helpers/validation_schema");

const axios = require("axios");

// const app = express();
const mailer_helper = require("../helpers/mailer_helper");
const projects = [
    {
        img: "https://res.cloudinary.com/kroy963/image/upload/v1638876733/PortFolio/CardImg2_e3enkd.png",
        cardTitle: "Auth Route Test FrontEnd",
        cardText: "This is a Register and Login test app created by React. ",
        siteUrl: "https://auth-route-test.herokuapp.com",
        gitUrl: "https://github.com/Kroy665/auth-route-test",
    },
    {
        img: "https://res.cloudinary.com/kroy963/image/upload/v1638876733/PortFolio/CardImg3_zob9on.png",
        cardTitle: "Auth Route Test Backend",
        cardText:
            "This is created with NodeJs, Express, MongoDB, Redis, bcrypt.",
        siteUrl: "https://auth-routh-test-backend.herokuapp.com",
        gitUrl: "https://github.com/Kroy665/auth-route-test-backend",
    },
    {
        img: "https://res.cloudinary.com/kroy963/image/upload/v1638877355/PortFolio/Screenshot_14_yjzkzx.png",
        cardTitle: "Infinite Menu Background Animation",
        cardText: "This is a single page site build by React",
        siteUrl: "https://xenodochial-neumann-93e6b7.netlify.app/",
        gitUrl: "https://github.com/Kroy665/Infinite-Menu-Background-Animation",
    },
    {
        img: "https://res.cloudinary.com/kroy963/image/upload/v1638877355/PortFolio/Screenshot_18_rmoe3q.png",
        cardTitle: "paranoia-diaries",
        cardText: "This is a single page site build by React",
        siteUrl: "https://agitated-kowalevski-358796.netlify.app/",
        gitUrl: "https://github.com/Kroy665/paranoia-diaries",
    },
    {
        img: "https://res.cloudinary.com/kroy963/image/upload/v1638877354/PortFolio/Screenshot_19_zfb1nn.png",
        cardTitle: "Excel Authentication Edit",
        cardText: "Upload Excel file to server, view, edit and download File",
        siteUrl: "https://excel-auth-test.herokuapp.com/",
        gitUrl: "https://github.com/Kroy665/excel-auth-test/",
    },
    {
        img: "https://res.cloudinary.com/kroy963/image/upload/v1638877354/PortFolio/Screenshot_20_tug1cy.png",
        cardTitle: "Excel Authentication Edit Backend",
        cardText: "Created By NodeJs, Multer, MongoDB, Express",
        siteUrl: "https://excel-auth-test-backend.herokuapp.com/",
        gitUrl: "https://github.com/Kroy665/excel-auth-test-backend/",
    },
];
router.post("/hireme", async (req, res, next) => {
    try {
        const result = await valClientSchema.validateAsync(req.body);
        console.log(result);
        const secret = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${result.token}`
        );
        const { success } = response.data;
        console.log(success);
        if (success) {
            const email = result.email;
            const name = result.name;
            const message = result.message;

            const info = await mailer_helper({ email, name, message });
            console.log("info-2: ", info);
            if (info) {
                return res.send({ success: true, message: "All Ok" });
            } else {
                return res.send({
                    success: false,
                    message: "Email Cannot Send",
                });
            }
        } else {
            return res.status(400).json({ error: "ReCaptcha not varified..." });
        }
    } catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
});

router.get("/test", async (req, res, next) => {
    try {
        res.send({ test: "Ok" });
    } catch (error) {
        next(error);
    }
});

router.get("/get-projects", async (req, res, next) => {
    try {
        res.send(projects);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
