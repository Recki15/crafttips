import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { activatePost, addNewPost, deletePost, editPostById, findPostById, getActivePosts, getInactivePosts, getPosts } from "../controllers/Posts.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/posts', getPosts);
router.get('/activePosts', getActivePosts);
router.get('/inactivePosts', getInactivePosts);
router.post('/addNewPost', addNewPost);
router.put('/editPostById', editPostById);
router.get('/findPostById/:id', findPostById);
router.delete('/deletePost/:id', deletePost);
router.put('/activatePost/:id', activatePost);
 
export default router;