
const express = require('express');
const hbs= require('hbs');
var app = express();

const fs= require('fs');

app.set('view_engine', 'hbs');




app.use( (req, res, next) => {
	
	var now = new Date().toString();
	
	var log=` ${now}: ${req.method}  ${req.url}`;
	
	fs.appendFile('server.log',log+'\n', (err) => {
		if(err){
			console.log(err);
		}
	});
	
	next();
	
});



// app.use( (req, res, next) => {
		
	// res.render('maintenance.hbs',{
		// pageTitle:'Site is under Maintenance',
		// welcomeMessage: 'we will be right back soon!!!'
	// })
	
// });

app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname + '/views/partials')


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
	
});


hbs.registerHelper('toUpper', (text) => {
	return text.toUpperCase();
	
});

app.get('/', (req, res) => {
	//res.send('<h1>Hello express</h1>');
	// res.send({
		// name: 'Ravi',
		// hobbies: ['Cricket', 'VideoGames']
	// });
	
	res.render('home.hbs',{
		pageTitle:'About Page',
		welcomeMessage: 'Welcome user! how is your learning going on?'
	})
	
});


app.get('/about', (req,res) => {
	res.render('about.hbs',{
		pageTitle:'About Page',
		currentYear:new Date().getFullYear()
	});
});


app.get('/Bad', (req,res) => {
	res.send({
		errorMessage: 'Some Bad Request Happened'
	});
});

app.listen(3000 , () => {
	console.log('Server is up on port 3000')
});

