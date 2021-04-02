import express from 'express'
import validator from '../middleware/validator'
import Usercontroller from '../controller/Authcontroller';
const Router = express.Router();
Router.post('/Auth/signup',validator.newAccountRule(),validator.validateInput,Usercontroller.Usercontroller.signup);
Router.post('/Auth/signin',validator.newAccountRule1(),validator.validateInput,Usercontroller.Usercontroller.signin);
export default Router;
