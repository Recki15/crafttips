import { where } from "sequelize";
import Ratings from "../models/RatingModel.js";

export const getRatings = async (req, res) => {
    try {
        const ratings = await Ratings.findAll(
            {
                attributes: ['userId', 'rating'],
                where: { postId: req.params.id }
            });
        res.json(ratings);
    } catch (error) {
        console.log(error);
    }
}

export const addRating = async (req, res) => {
    const { postId, userId, rating } = req.body;
    try {
        const ratings = await Ratings.create(
            {
                postId: postId,
                userId: userId,
                rating: rating
            });
        res.json({ msg: "Successfully rated!" });
    } catch (error) {
        console.log(error);
    }
}

export const updateRating = async (req, res) => {
    const { postId, userId, rating } = req.params;
    console.log(userId)
    try {
        const ratings = await Ratings.update(
            {
                rating: rating,
            },
            {
                where: {
                    postId: postId,
                    userId: userId
                }
            }
        );
        res.json(ratings);
    } catch (error) {
        console.log(error);
    }
}