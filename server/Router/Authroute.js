import express from 'express'
import validator from '../middleware/validator'
import {verifAuth} from"../middleware/Authverification"
import Usercontroller from "../controller/Authcontroller"
const Router = express.Router();
Router.post('/Auth/signup',validator.newAccountRule(),validator.validateInput,Usercontroller.Usercontroller.signup);
Router.post('/Auth/signin',validator.newAccountRule1(),validator.validateInput,Usercontroller.Usercontroller.signin);
Router.patch('/Auth/changePassword',verifAuth,validator.validateInput,Usercontroller.Usercontroller.changePassword);

export default Router;
