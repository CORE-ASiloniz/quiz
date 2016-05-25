var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	//Después de index iba , { title: 'Quiz' } 
  		res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res, next) {
 	res.render('author');
 });

//Autoload de rutas que usen :quizId
router.param('quizId', quizController.load); //autoload :quizId

router.get('/quizes.:format?', quizController.index);
router.get('/quizes/:quizId(\\d+).:format?', quizController.show);
router.get('/quizes/:quizId(\\d+)/check', quizController.check);
router.get('/quizes/new',quizController.new);
router.post('/quizes', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

/* Definición de rutas de comments */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


module.exports = router;
