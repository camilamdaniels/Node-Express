const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

app.use(bodyParser.json());

let users = [];
let userId = 0;

app.get('/users', (req, res) => {
	res.send(users);
});

app.post('/users', (req, res, next) => {
	userId++;
	const name = req.body.name;
	const newUser = {
		id: userId,
		username: name
	};
	users.push(newUser);
	res.send(users);
});

app.get('/users/:id', (req, res) => {
	const key = req.params.id;
	const user = users.filter(item => {
		return item.id === Number(key);
	});
	res.send(user);
});

app.delete('/users/:id', (req, res) => {
	const key = req.params.id;
	const newUsers = users.filter(user => {
		return key !== user.id.toString();
	});
	users = newUsers;
	res.send(users);
});

app.get('/search', (req,res) => {
	res.send(users.filter(item => {
		return item.name.toLowerCase() === req.query.name.toLowerCase();
	}));
});


app.listen(port, err => {
	if (err) {
		console.log(`There was an error starting the server: ${err}`);
	} else {
		console.log(`App listening on port ${port}`);
	}
})

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3001;

// app.use(bodyParser.json());

// let users = [];
// let id = 0;

// app.post('/users/:name', (req, res, next) => {
//   const user = {
//     name: req.params.name,
//     id: id++,
//   }
//   users.push(user);
//   res.send(users);
// });

// app.get('/users', (req, res) => {
//   res.send(users);
// });

// app.get('/users/:id', (req, res) => {
//   res.send(users[req.params.id]);
// });

// app.get('/search', (req, res) => {
//   res.send(users.filter(item => {
//     return item.name.toLowerCase() === req.query.name.toLowerCase()
//   }));
// });

// app.delete('/users/:id', (req, res) => {
//   users = users.filter(item => {
//     return item !== users[req.params.id];
//   });
//   res.send(users);
// });

// app.listen(PORT, err => {
//   if (err) {
//   console.log(`There was an error starting the server: ${err}`);
//   } else {
//     console.log(`App listening on port ${PORT}`);
//   }
// });
