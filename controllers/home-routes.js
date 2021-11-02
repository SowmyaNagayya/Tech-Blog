const router = require('express').Router();
const { Post, User, Comment } = require('../models');
//const withAuth = require('../../utils/auth');

// GET all Post for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true })
    );
    res.render('allposts', {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



//Get login Routes


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


//Get signup Routes
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

//get edit for update and delete
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

  router.put('/post/:id',  async (req, res) => {
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
  

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
