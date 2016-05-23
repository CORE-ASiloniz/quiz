var models = require('../models');
var Sequelize = require('sequelize');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error('No existe quizId='+quizId));
		}
	}).catch(function(error){next(error); });
};


// GET /quizes
exports.index= function(req, res, next){
	models.Quiz.findAll({where: {question: {$like: "%" + req.query.search + "%"}}}).then(function(quizes) {
 		if(req.params.format === 'json') {
			var texto_div = JSON.stringify(quizes).split(',');
			var texto = '';
			for(var i in texto_div) {
				if(texto_div[i].match(/^{/)) {
					texto += '<br>';
				}
				texto += texto_div[i] + '<br>';
			}
			res.send(texto);
		} else {
			res.render('quizes/index.ejs', {quizes: quizes});
		}
	}).catch(function(error) {
 		next(error);})
};

// GET /quizes/:id
exports.show = function(req, res, next){
	console.log("quiz_controller: estoy atendiendo show");
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		console.log("quiz_controller: estoy en function(quiz)");
		if(quiz){
		if(req.params.format === 'json') {
				var texto_div = JSON.stringify(quiz).split(',');
				var texto = '';
				for(var i in texto_div) {
					texto += texto_div[i] + '<br>';
				}
				res.send(texto);
			} else {
				var answer = req.query.answer || '';
				res.render('quizes/show', {quiz: quiz, answer: answer});
			}
		}
		else{
			throw new Error('No hay preguntas en la BBDD.');
		}
	}).catch(function(error){next(error);});
};

// GET /quizes/check
exports.check = function(req, res, next) { //antes en vez de check answer
		console.log("quiz_controller: estoy en check");
	models.Quiz.findById(req.params.quizId).then(function(quiz) {	
			if(quiz){
 			var answer = req.query.answer || "";
 			var result = (answer === req.quiz.answer) ? 'Correcta' : 'Incorrecta';
			res.render('quizes/result', { quiz:req.quiz, result: result, answer: answer});
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

//GET /quizes/new
exports.new = function(req, res, next){
	var quiz = models.Quiz.build({question: "", answer: ""});
	res.render('quizes/new',{quiz: quiz});
};

//POST /quizes/create

exports.create = function(req, res, next) {
	var quiz = models.Quiz.build({question: req.body.quiz.question, answer: req.body.quiz.answer});

	// Guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ['question', 'answer']}).then(function(quiz) {

		req.flash('success', 'Quiz creado con éxito');
		res.redirect('/quizes');	// res.redirect:
	}).catch(Sequelize.ValidationError, function(error) {
		req.flash('error', 'Errores en el formulario:');
		for(var i in error.errors) {
			req.flash('error', error.errors[i].value);
		};
		res.render('quizes/new', {quiz: quiz});	
	}).catch(function(error) {		// redirección HTTP a lista de preguntas
		req.flash('error','Error al crear un Quiz'+error);
		next(error);
	}); 
}; 
// GET /quizzes/:id/edit
exports.edit = function(req, res, next) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz});
};

// PUT /quizzes/:id
exports.update = function(req, res, next) {
	req.quiz.question = req.body.quiz.question;
	req.quiz.answer = req.body.quiz.answer;
	req.quiz.save({fields: ['question', 'answer']}).then(function(quiz) {
		req.flash('success', 'Quiz editado con éxito');
		res.redirect('/quizes');
		console.log('\n\nVa bien\n\n');
	}).catch(Sequelize.ValidationError, function(error) {
		req.flash('error', 'Errores en el formulario:');
		console.log('\n\nPrimer error 1\n\n');
		for(var i in error.errors) {
			req.flash('error', error.errors[i].value);
		};
		console.log('\n\nPrimer error 2\n\n');
		res.render('quizes/edit', {quiz: req.quiz});
		console.log('\n\nPrimer error 3\n\n');
	}).catch(function(error) {
		console.log('\n\nSegundo error\n\n');
		req.flash('error', 'Error al editar el Quiz: ' + error.message);
		next(error);
	});
};


