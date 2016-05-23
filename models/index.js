var path = require('path');

//Cargar Model ORM
var Sequelize = require('sequelize');


//Importar la definicion de la tabla Quiz en quiz.js
var url, storage;

if(!process.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}

//Usar BBDD SQLite
//var sequelize = new Sequelize(null, null, null,{dialect: "sqlite", storage: "quiz.sqlite"});
var sequelize = new Sequelize(url, { storage: storage, omitNull: true});

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//sequelize.sync() crea e inicializa tabla de preguntas en DB

sequelize.sync().then(function(){//sync() crea la tabla de quiz
	console.log("Intento hacer la tabla. ");
	return Quiz.count().then(function (c) {
			console.log("Estoy antes del if");
			if (c === 0) { //la tabla se inicializa si está vacía
				console.log("Estoy despues del if");
				return Quiz.bulkCreate([{ question:"Capital de Italia", answer: "Roma"},
					{ question:"Capital de Portugal", answer: "Lisboa"}]).then(function(){
						console.log('Base de datos inicializada con datos');
					});
			}
		});
}).catch(function(error){
	console.log("Error sincronizando las tablas de la BBDD;", error);
	process.exit(1);
});

exports.Quiz = Quiz; //exportar la definicion de la tabla Quiz

	