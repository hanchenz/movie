import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );

            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to post review." });
            } else {
                res.json({ status: "success"});
            }
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const review = req.body.review;
            const reviewId = req.body.review_id;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date();

            const updateResponse = await ReviewsDAO.updateReview(
                reviewId,
                review,
                userInfo,
                date
            );

            if (updateResponse.modifiedCount < 1) {
                res.status(500).json({ error: "Unable to update review." });
            } else {
                res.json({ status: "success"});
            }
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;

            const deleteResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            );

            if ( deleteResponse.deletedCount < 1) {
                res.status(500).json({ error: "Unable to delete review." });
            } else {
                res.json({ status: "success"});
            }
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }
    
}