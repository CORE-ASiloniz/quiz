var models = require('../models');

// GET /quizes/question
exports.question = function(req, res, next){
	console.log("quiz_controller: estoy atendiendo question");
	models.Quiz.findOne().then(function(quiz){
		console.log("quiz_controller: estoy en function(quiz)");
		if(quiz){
		var answer = req.query.answer || '';
		res.render('quizes/question', {question: quiz.question, answer:answer}); //Ojo con el quiz.pregunta antes era quiz[0].pregunta
		}
		else{
			throw new Error('No hay preguntas en la BBDD.');
		}
	}).catch(function(error){next(error);});
};

// GET /quizes/check
exports.check = function(req, res, next) { //antes en vez de check answer
		console.log("quiz_controller: estoy en check");
	models.Quiz.findOne().then(function(quiz){
		console.log("quiz_controller: estoy en function(quiz) del check");
		if(quiz){
			var answer=req.query.answer || "";
			var result = ( answer === quiz.answer ) ? 'Correcta' : 'Incorrecta';
			res.render('quizes/result', {result: result, answer: answer});
		}
		else{
			throw new Error('No hay preguntas en la BBDD.');
		}	
	}).catch(function(error){ next(error);});
};

//GET /quizes/author
exports.author = function(req, res, next){
	res.render('quizes/author');
};
