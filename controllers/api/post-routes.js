const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

//Add new blog post to database
router.post('/', withAuth, async (req, res) => {
  try {
    // console.log("post: ",req.session)
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates an entry by id
router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id,
      user_id: req.session.user_id
    }
  })
    .then(updatedPost => res.json(updatedPost))
    .catch(err => res.status(400).json(err));
});


// Deletes an post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletepostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (!deletepostData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(deletepostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;