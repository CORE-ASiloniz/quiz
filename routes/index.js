var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


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
router.param('userId', userController.load);  // autoload :userId
router.param('commentId', commentController.load);	// Autoload :commentId

// Definición de rutas de sesion
router.get('/session',    sessionController.new);     // formulario login
router.post('/session',   sessionController.create);  // crear sesión
router.delete('/session', sessionController.destroy); // destruir sesión


// Definición de rutas de cuenta
router.get('/users',                    userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      userController.show);    // ver un usuario
router.get('/users/new',                userController.new);     // formulario sign un
router.post('/users',                   userController.create);     // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, userController.ownershipRequired, userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      sessionController.loginRequired, userController.ownershipRequired, userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   sessionController.loginRequired, userController.ownershipRequired, userController.destroy);  // borrar cuenta
 
router.get('/quizes.:format?', quizController.index);
router.get('/quizes/:quizId(\\d+).:format?', quizController.show);
router.get('/quizes/:quizId(\\d+)/check', quizController.check);
router.get('/quizes/new',                 	sessionController.loginRequired, 
											quizController.new);
router.post('/quizes',                    	sessionController.loginRequired, 
											quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  	sessionController.loginRequired, 
										   	quizController.ownershipRequired, 
										   	quizController.edit);
router.put('/quizes/:quizId(\\d+)',       	sessionController.loginRequired, 
											quizController.ownershipRequired, 
											quizController.update);
router.delete('/quizes/:quizId(\\d+)',    	sessionController.loginRequired, 
											quizController.ownershipRequired, 
											quizController.destroy);

/* Definición de rutas de comments */
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.loginRequired, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.loginRequired, commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/accept', sessionController.loginRequired, quizController.ownershipRequired, commentController.accept);
module.exports = router;
