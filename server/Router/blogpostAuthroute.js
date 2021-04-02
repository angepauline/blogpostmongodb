import express from 'express'
import validator from '../middleware/validator'
import {verifAuth} from"../middleware/Authverification"
import blogcontroller from '../controller/blogpostcontroller';
const Router = express.Router();
//Router.post('/blogpost/create',verifAuth,blogcontroller.blogpost);
Router.get('/blogpost/one/:id',verifAuth,blogcontroller.getOneBlog);
Router.get('/blogpost/all',verifAuth,blogcontroller.getAllBlog);
Router.post('/blogpost/create',validator.newBlogRule(),validator.validateInput,verifAuth,blogcontroller.blogpost);
Router.delete('/blogpost/delete/:id',verifAuth,validator.verifyAccess,validator.validateInput,blogcontroller.deleteOneBlog);
Router.patch('/blogpost/update/:id',verifAuth,validator.verifyAccess,validator.validateInput,blogcontroller.upDate);
export default Router;