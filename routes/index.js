var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	//Después de index iba , { title: 'Quiz' } 
  		res.render('index', { title: 'Quiz' });
});

//Autoload de rutas que usen :quizId
router.param('quizId', quizController.load); //autoload :quizId

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/check', quizController.check);
router.get('/quizes/new',quizController.new);
router.get('/quizes/author', quizController.author);
router.post('/quizes', quizController.create);

module.exports = router;
