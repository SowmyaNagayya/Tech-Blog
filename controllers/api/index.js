const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
//const dashboardRoutes = require('./dashboard-routes');
const commentRoutes = require('./comment-routes.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
//router.use('/dasnboard', dashboardRoutes);
router.use('/comment', commentRoutes);

module.exports = router;