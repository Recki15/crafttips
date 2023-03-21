import { Op, where } from "sequelize";
import Posts from "../models/PostModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ['id', 'title', 'cover_image', 'short_desc']
        });
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const addNewPost = async(req, res) => {
    const { title, cover_image, short_desc, long_desc, tools, creator_id } = req.body;
    try {
        await Posts.create({
            title: title,
            cover_image: cover_image,
            short_desc: short_desc,
            long_desc: long_desc,
            tools: tools,
            creator_id: creator_id
        });
        res.json({ msg: "Post creation successfull" });
    } catch (error) {
        console.log(error);
    }
}

export const editPostById = async(req, res) => {
    const { title, cover_image, short_desc, long_desc, creator_id, postId } = req.body;
    try{
        await Posts.update(
            {
            title: title,
            cover_image: cover_image,
            short_desc: short_desc,
            long_desc: long_desc,
            where: {
                creator_id: creator_id,
                postId: postId
            }
        }
        )
         res.json(true)  
    }catch(error){
        console.log(error);
        res.status(404).json({ msg: "Error!" });
    }
}

export const findPostById = async(req, res) => {
    try {
        const post = await Posts.findOne(
            {
                attributes: ['id', 'title', 'cover_image', 'long_desc'],
                where: {id: req.params.id}
            },
        )
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Error!" });
    }
}