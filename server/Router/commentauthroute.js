import express from "express";
import commentController from "../controller/commentController";
import {verifAuth} from '../middleware/Authverification';
const commentRoute =express.Router();
commentRoute.post('/create/:id',verifAuth,commentController.createComment);
commentRoute.delete('/deletecomment/:id',verifAuth,commentController.deleteComment);
export default commentRoute;





