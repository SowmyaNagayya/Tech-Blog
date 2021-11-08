const router = require('express').Router();
const { Comment, User } = require('../../models/');
//const withAuth = require('../../utils/auth');

// Adds new comment to database
router.post('/',  async (req, res) => {
  // try {
    console.log(req.body)
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;