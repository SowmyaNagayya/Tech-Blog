const router = require('express').Router();
const { Post, User, Comment } = require('../models');
//const withAuth = require('../../utils/auth');

// GET all Post for homepage for different existing user
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment
        }
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true })
    );

    console.log(posts)
    res.render('allposts', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



//Get login Routes


router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  };
});


//Get signup Routes
router.get('/signup', (req, res) => {
  try {
    res.render('signup', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  };
});


//get edit for update and delete//check
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editpost', { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//when you click on upadate it should post in home
router.put('/post/:id', async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Comments
router.get('/comment/:id', async (req, res) => {
  console.log(req.body);


  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('singlepost', { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;