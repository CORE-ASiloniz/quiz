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

// Importar la definicion de la tabla Comment de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));
// Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

// Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Relacion 1 a N entre User y Quiz
User.hasMany(Quiz, { foreignKey: 'AuthorId' });
Quiz.belongsTo(User, { as: 'Author', foreignKey: 'AuthorId' });

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment; // exportar definición de tabla Comment 
exports.User = User;       // exportar definición de tabla Users
	