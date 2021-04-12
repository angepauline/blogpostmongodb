import { generateAuthToken } from "../Helpers/Token";
import Userdata from "../model/Usermodel";
import bcrypt from 'bcrypt'
import Response from '../Helpers/response'
import EmailHelper from "../Helpers/emailTemplate"

class Usercontroller {
    static changePassword = async (req, res) => {
        let {
            oldPassword,
            newPassword,
            confirmPassword

        } = req.body;
        const userId = req.body.userId;
        const userDetails = await Userdata.findById(userId)
        if (bcrypt.compareSync(oldPassword, userDetails.password)) {
            if (newPassword === confirmPassword) {

                const password = bcrypt.hashSync(newPassword, 10);
                const passwordChangeTime = Date.now();
                const userUpdated = await Userdata.findByIdAndUpdate(userId, {
                    password: password,
                    passwordChangeTime: passwordChangeTime
                })
                return Response.successMessage(res, "sucess", userUpdated, 200)
            }

            return Response.errorMessage(res,"please provide the confirm password that match with new password",417)

        }
        return Response.errorMessage(res,"please provide the correct old password ",417)
    }
    static signup = async (req, res) => {
        let {
            firstname,
            lastname, email,
            gender,
            role,
            department,
            address,
            password
        } = req.body;
        password = bcrypt.hashSync(password, 12);

        const isemailexist = await Userdata.findOne({ email: email })
        req.body.password = password;

        if (isemailexist) {
            return Response.errorMessage(res, "email is duplicated", 409)


        }
        const data = await Userdata.create(req.body);
        if (!data) {
            return Response.errorMessage(res, "signup failed", 417)

        }
        else {
            let { password, ...datawithoutpassword } = data._doc;
            await EmailHelper.userWelcomeEmail(datawithoutpassword);
            return Response.successMessage(res, "account created succefullly", datawithoutpassword, 201)

        }

    }
    static signin = async (req, res) => {
        let {
            email,
            password
        } = req.body;
        const isUserexist = await Userdata.findOne({ email: email })

        if (isUserexist && bcrypt.compareSync(password, isUserexist.password)) {

            const data = isUserexist
            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role,
                passwordChangeTime: data.passwordChangeTime

            });

            let { password, ...datawithoutpassword } = data._doc
            return Response.successMessage(res, "login successfully", { token, datawithoutpassword }, 201)


        }
        return Response.errorMessage(res, "user password incorrect", 409)


    }



}
export default { Usercontroller }
