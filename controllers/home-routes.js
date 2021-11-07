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
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true })
    );
    res.render('allposts', {
      posts,
      loggedIn:req.session.logged_in
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

//get edit for update and delete//check
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          // {
          //   model: Comment,
          //   attributes: ['body', "user_id"],
          // },
        ],
      });
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('editpost', { post, loggedIn:req.session.logged_in });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//when you click on upadate it should post in home
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

  //Comments
  router.get('/comment/:id',  async (req, res) => {
    console.log(req.body);
    
      
    try {

      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          // {
          //   model: Comment,
          //   attributes: ['body'],
          //   include: [User],
          // },
        ],
      });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('singlepost', { post, loggedIn:req.session.logged_in });
    } else {
      res.status(404).end();
    }

      // const newComment = await Comment.create({
      //   ...req.body,
      //   user_id: req.session.user_id,
      // });
      // res.json(newComment);
      //res.render('singlepost', { Comment });
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