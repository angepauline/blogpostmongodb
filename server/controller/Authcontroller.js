import { generateAuthToken } from "../Helpers/Token";
import Userdata from "../model/Usermodel";
import bcrypt from 'bcrypt'

class Usercontroller {
    static signup =async (req, res) => {
        let {
            firstname,
            lastname,email,
            gender,
            role,
            department,
            address,
            password
        } = req.body;
        password=bcrypt.hashSync(password,12);

        const isemailexist = await Userdata.findOne({email:email})
        req.body.password=password;

        if (isemailexist) {
            return res.status(409).json({
                statu: 409,
                error: "email is duplicated",
            })
        }
        const data = await Userdata.create(req.body);
        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "signup failed"

            })
        }
        else{
           let{password,...datawithoutpassword}=data._doc 
        return res.status(201).json({
            status: 201,
            message: "account created succefullly",
           data:datawithoutpassword

        })

        }
       
    }
    static signin =async (req, res) => {
        let{
            email,
            password
        }=req.body;
        const isUserexist=await Userdata.findOne({email:email})
        
        if(isUserexist&&bcrypt.compareSync(password,isUserexist.password)){
            
            const data=isUserexist
            const token =generateAuthToken({
                id:data.id,
                email:data.email,
                role:data.role
    
            });
          
        let{password,...datawithoutpassword}=data._doc
        return res.status(200).json({
            
            status: 200,
            message: "login sucessfully",
            token:token,
            data:datawithoutpassword
        })
    
        }
        
        return res.status(404).json({
            status :404,
            message:"user password incorrect"

        })
    
    }
    


}
export default {Usercontroller}
