const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res)=> {
    try {
        const newPost = await User.create( {
            title: req.body.title,
            content: req.body.content,
            userId: req.session.user_id,
        });
        res.status(200).json(newUser);
      } catch (err) {
        res.status(400).json(err);
      }
    });

module.exports = router;