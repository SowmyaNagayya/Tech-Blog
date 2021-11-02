const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/newpost', withAuth, (req, res) => {
  res.render('newpost', {
  
  });
});

//edit in dashboard
// get 
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['body', "user_id"],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editpost', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates an entry by id
router.put('/:id', withAuth, (req, res) => {
  Post.update (req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedPost => res.json(updatedPost))
  .catch(err => res.status(400).json(err));
});



module.exports = router;