const router = require('express').Router();
const verify = require('../Auth/verifyLogin')
const Comment = require('../model/Comment')
const Post = require('../model/Post')
const validate = require('../validation/validation')

router.post("/post/:id/comment", verify, async (req, res) => {

    try {
        //Find Post
        const result = await Post.findById(req.params.id)

        //Check length
        if (validate.lengthCheck(req.body.comment, 5)) return res.send({ error: "Comment min length 5!!!" })

        const comment = new Comment({
            comment: req.body.comment,
            postId: result._id,
            CommentBy: req.user
        });

        await comment.save()
        res.status(201).send({
            comment: {
                commentMsg: req.body.comment,
                post: result
            }
        })
    } catch (error) {
        res.status(400).send({ error: "Post not found!!!" })
    }
});
module.exports = router