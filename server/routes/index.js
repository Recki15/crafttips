import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { addNewPost, editPostById, findPostById, getPosts } from "../controllers/Posts.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/posts', getPosts);
router.post('/addNewPost', addNewPost);
router.put('/editPostById', editPostById);
router.get('/findPostById', findPostById);
 
export default router;