'use strict';

var pg = require('pg');


var DATABASE = process.env.DATABASE_URL;

pg.connect(DATABASE, function(error, client, done) {
	if(error) {
		return console.error(error);
	}
});

module.exports.listPostsDesc = function(callback) {
	pg.connect(DATABASE, function(error, client, done) {
		if(error) {
			return callback(error);
		}

		var query = 'SELECT * FROM posts ORDER BY date DESC LIMIT 20;';
		client.query(query, function(error, result) {
			done();

			if(error) {
				console.error(error);
				return callback(error);
			} else {
				return callback(null, result.rows);
			}
		});
	});
};

module.exports.savePost = function(title, content, date, author, words, chars, callback) {
	pg.connect(DATABASE, function(error, client, done) {
		if(error) {
			return callback(error);
		}

		var values = [title, content, author, words, chars, date];
		var query = 'INSERT INTO posts (title, content, author, words, chars, date)' +
						'VALUES($1, $2, $3, $4, $5, $6);';
		client.query(query, values, function(error, result) {
			done();

			if(error) {
				console.error(error);
				return callback(error);
			} else {
				return callback(null, true);
			}
		});
	});
};

module.exports.deletePost = function(id, callback) {
	pg.connect(DATABASE, function(error, client, done) {
		if(error) {
			return callback(error);
		}

		var query = 'DELETE FROM posts WHERE id=$1';
		client.query(query, [id], function(error, status) {
			done();

			if(error) {
				console.error(error);
				return callback(error);
			} else {
				return callback(null, true);
			}
		});
	});
};
