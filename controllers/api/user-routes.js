const router = require('express').Router();
const { User } = require('../../models/');

//when click on login from nav bar
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when click on login button is trying to get data from database(checking from database)
router.post('/login', async (req, res) => {
  console.log(req.body)
  // try {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(400).json({ message: 'No user account found!' });
    return;
  }

  const validPassword = user.checkPassword(req.body.password);

  if (!validPassword) {
    res.status(400).json({ message: 'No user account found!' });
    return;
  }
  else {

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  }
  // } catch (err) {
  //   res.status(400).json({ message: 'No user account found!' });
  // }
});

//existing user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;