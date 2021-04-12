import { check, validationResult } from "express-Validator"
import blogInfo from "../model/blogpostmodel";

class Validator {

    static verifyAccess = async (req, res, next) => {
        const useridFromToken = req.body.userid;
        const blogIdFromParams = req.params.id;
        const blog = await blogInfo.findById(blogIdFromParams)
        if (!blog) {
            return res.status(404).json({
                status: 404,
                message: "blog not exist"
            })
        }
        else if (useridFromToken == blog.userId._id) {
            return next();
        }
        return res.status(401).json({
            status: 401,
            message: "you are not authorised"
        })
    }

    static newAccountRule() {
        return [check("email", "your email is valid").isEmail(),
        check("lastName", "your name must not contain special charactor").isAlpha(),
        check("firstName", "your name must not contain special charactor").isAlpha(),
        check("gender", "we have only male and female").isIn(["male", "female"]),
        check("password", "please provide strong password").isStrongPassword()


        ]

    }
    static newAccountRule1() {
        return [check("email", "your email is not valid").isEmail(),
        check("password", "please provide strong password").isStrongPassword()
        ]

    }
    static newBlogRule(){
        return [check("title", "title...................").isLength({max:50})]
    }

    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            const errorMessage = errors.errors.map(e => e.msg);
            return res.status(400).json({
                status: 400,
                error: errorMessage
            })
        }
        return next()
    }
}
export default Validator;