const router = require('express').Router();
const login = require('./login');
const users = require('./users');
const workouts = require('./workouts');
const muscleGroups = require('./muscleGroups');
const exerciseTypes = require('./exerciseTypes');

router.use('/', login);
router.use('/users', users);
router.use('/workouts', workouts);
router.use('/musclegroups', muscleGroups);
router.use('/exercisetypes', exerciseTypes);

module.exports = router;
