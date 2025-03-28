require('dotenv').config(); // Load .env variables

const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors')
const uuid = require('uuid');
const app = express();
const DB = require('./database.js')

const authCookieName = 'token';

app.use(cors({
  origin: ['http://localhost:5173', 'https://startup.calorietracker.click'],
  credentials: true,
}));


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Backend API
app.get('/api/food', async (req, res) => {
  const query = req.query.query;
  const API_KEY = process.env.USDA_API_KEY;
  try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${API_KEY}`);
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error("Error fetching from USDA:", error);
      res.status(500).json({ error: "Failed to fetch food data" });
  }
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    await DB.updateUser(user)
    setAuthCookie(res, user.token);
    req.user = user; // Set user object to request
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user)
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.post('/calories', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
  }

  const { foodName, calories, date } = req.body;
  if (!foodName || !calories || !date) {
      return res.status(400).json({ msg: 'Food name, calories, and date are required' });
  }

  try {
      await DB.addFoodEntry(user.email, foodName, calories, date);
      res.json({ msg: 'Food entry logged successfully' });
  } catch (error) {
      console.error('Error saving food entry:', error);
      res.status(500).json({ msg: 'Internal server error' });
  }
});

apiRouter.get('/calories/weekly', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const weeklyData = await DB.getWeeklyCalories(user.email);
    res.json(weeklyData.map(entry => ({ date: entry._id, calories: entry.totalCalories })));
  } catch (error) {
    console.error('Error fetching weekly calorie data:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await DB.addUser(user)
  
    return user;
}
  
async function findUser(field, value) {
    if (!value) return null;
  
    if (field === 'token') {
      return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}
  
// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});