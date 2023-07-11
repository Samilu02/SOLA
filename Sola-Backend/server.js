// Clear require cache
Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
});

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { group } = require('console');


// JWT secret key
const jwtSecretKey = process.env.JWT_SECRET_KEY;
// Set up App
const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
const port = process.env.PORT || '3009';
app.set('port', port);

const server = http.createServer(app);

// Create the client and connect to the database
let database;
const client = new MongoClient(config.mongodb_connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((error) => {
    if (error) {
        console.log("Could not connect to MongoDB:")
        console.log(error.message);
    }
    else {
        database = client.db('EventDB');
        console.log("Successfully connected to MongoDB.");
    }
})

// Middleware for authenticating tokens
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'examplestring', (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

// Welcome message
app.get('/api', async (req, res) => {
    res.send("Welcome to the Event Database API");
})

// User registration
app.post('/api/register', async (req, res) => {
    try {
        const collection = database.collection('users');

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        var user = {
            username: req.body.username,
            password: hashedPassword
        };

        const result = await collection.insertOne(user);
        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// User login
app.post('/api/login', async (req, res) => {
    try {
        const collection = database.collection('users');
        const user = await collection.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send({ error: "Invalid password" });
        }

        // If the username and password are correct, create a JWT for the user
        const token = jwt.sign({ _id: user._id }, 'examplestring');

        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Get all teilnehmende
app.get('/api/teilnehmende', authenticateToken, async (req, res) => {
    try {
        const collection = database.collection('teilnehmende');

        const query = {};

        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Get a teilnehmer by their id
app.get('/api/teilnehmende/:id', authenticateToken, async (req, res) => {
    let id = req.params.id;

    try {
        const collection = database.collection('teilnehmende');
        const query = { _id: ObjectId(id) }; 
        const result = await collection.findOne(query);

        if (!result) {
            let responseBody = { status: "No object with id " + id };
            res.status(404).send(responseBody);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Create a new teilnehmer
app.post('/api/teilnehmende', authenticateToken, async (req, res) => {
    try {
        const collection = database.collection('teilnehmende');

        var teilnehmer = {
            name: req.body.name,
            origin: req.body.origin,
            age: req.body.age,
            group: req.body.group
        };

        const result = await collection.insertOne(teilnehmer);
        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Update an existing teilnehmer
app.put('/api/teilnehmende/:id', authenticateToken, async (req, res) => {
    let id = req.params.id;
    let teilnehmer = req.body;
    delete teilnehmer._id; 

    try {
        const collection = database.collection('teilnehmende');
        const query = { _id: ObjectId(id) }; 
        const result = await collection.updateOne(query, { $set: teilnehmer });

        if (result.matchedCount === 0) {
            let responseBody = { status: "No object with id " + id };
            res.status(404).send(responseBody);
        } else {
            res.send({ status: "Object with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Delete an existing teilnehmer
app.delete('/api/teilnehmende/:id', authenticateToken, async (req, res) => {
    let id = req.params.id;

    try {
        const collection = database.collection('teilnehmende');
        const query = { _id: ObjectId(id) }; 
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            let responseBody = { status: "No object with id " + id };
            res.status(404).send(responseBody);
        } else {
            let responseBody = { status: "Object with id " + id + " has been successfully deleted." };
            res.send(responseBody);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Get all handlungen
app.get('/api/handlungen', authenticateToken, async (req, res) => {
    try {
        const collection = database.collection('handlungen');
        const query = {};
        if (req.query.label) {
            query.label = req.query.label;
        }

        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Get a handlung by its id
app.get('/api/handlungen/:id', authenticateToken, async (req, res) => {
    let id = req.params.id;
    try {
        const collection = database.collection('handlungen');
        const query = { _id: ObjectId(id) }; 
        const result = await collection.findOne(query);

        if (!result) {
            let responseBody = { status: "No object with id " + id };
            res.status(404).send(responseBody);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Create a new handlung
app.post('/api/handlungen', authenticateToken, async (req, res) => {
    try {
        const collection = database.collection('handlungen');

        var handlung = {
            title: req.body.title,
            description: req.body.description,
            value: req.body.value,
            teilnehmer: req.body.teilnehmer.map(id => ObjectId(id)) // Expecting an array of id strings
        };

        const result = await collection.insertOne(handlung);
        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Update an existing handlung
app.put('/api/handlungen/:id', authenticateToken, async (req, res) => {
    let id = req.params.id;
    let handlung = req.body;
    delete handlung._id; 
    handlung.teilnehmer = handlung.teilnehmer.map(id => ObjectId(id)); // Convert to array of ObjectIds

    try {
        const collection = database.collection('handlungen');
        const query = { _id: ObjectId(id) }; 
        const result = await collection.updateOne(query, { $set: handlung });

        if (result.matchedCount === 0) {
            let responseBody = { status: "No object with id " + id };
            res.status(404).send(responseBody);
        } else {
            res.send({ status: "Object with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Delete an existing handlung
app.delete('/api/handlungen/:id', authenticateToken, async (req, res) => {
    let id = req.params.id;

    try {
        const collection = database.collection('handlungen');
        const query = { _id: ObjectId(id) }; 
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            let responseBody = { status: "No object with id " + id };
            res.status(404).send(responseBody);
        } else {
            let responseBody = { status: "Object with id " + id + " has been successfully deleted." };
            res.send(responseBody);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Get handlungen with teilnehmer
app.get("/api/handlungenWithTeilnehmer", authenticateToken, async (req, res) => {
    try {
      const handlungenCollection = database.collection("handlungen");

      const handlungen = await handlungenCollection
        .aggregate([
          {
            $lookup: {
              from: "teilnehmende",
              localField: "teilnehmer",
              foreignField: "_id",
              as: "teilnehmer",
            },
          },
          {
            $unwind: "$teilnehmer",
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: "$title" },
              description: { $first: "$description" },
              value: { $first: "$value" },
              teilnehmerNames: { $push: "$teilnehmer.name" }
            }
          },
        ])
        .toArray();

      res.send(handlungen);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
})

// Start the server
server.listen(port, () => console.log("app listening on port " + port));
