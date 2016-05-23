var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	//Después de index iba , { title: 'Quiz' } 
  		res.render('index', { title: 'Quiz' });
});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/check', quizController.check);
router.get('/quizes/author', quizController.author);

module.exports = router;
