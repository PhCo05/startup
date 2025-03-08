const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// The users are saved in memory and disappear whenever the service is restarted.
let users = [];
let calorieData = {};

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

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

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
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

// Store today's calorie total
apiRouter.post('/calories/today', verifyAuth, (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const { calories } = req.body;

  if (!calories || typeof calories !== 'number' || calories < 0) {
    return res.status(400).send({ msg: 'Invalid calorie value' });
  }

  if (!calorieData[req.user.email]) {
    calorieData[req.user.email] = {};
  }

  calorieData[req.user.email][today] = calories;
  res.json({ message: "Calories logged", data: calorieData[req.user.email] });
});

// Get the past week's calorie data
apiRouter.get('/calories/week', verifyAuth, (req, res) => {
  const today = new Date();
  const email = req.user.email;
  let userCalories = calorieData[email] || {};

  let weekData = [];
  for (let i = 6; i >= 0; i--) {
    let day = new Date(today);
    day.setDate(today.getDate() - i);
    let dateStr = day.toISOString().split('T')[0];
    weekData.push({ date: dateStr, calories: userCalories[dateStr] || 0 });
  }

  // Reset data if today is Monday
  if (today.getDay() === 1) {
    calorieData[email] = {};
  }

  res.json(weekData);
});

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    users.push(user);
  
    return user;
}
  
async function findUser(field, value) {
    if (!value) return null;
  
    return users.find((u) => u[field] === value);
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
  
apiRouter.post('/auth/login', async (req, res) => {
    console.log('Login request received:', req.body);  // Log incoming request data

    try {
        const user = await findUser('email', req.body.email);
        if (!user) {
            console.log('User not found:', req.body.email);
            return res.status(401).send({ msg: 'Unauthorized' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            console.log('Incorrect password for:', req.body.email);
            return res.status(401).send({ msg: 'Unauthorized' });
        }

        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        console.log('User authenticated:', user.email);
        res.send({ email: user.email });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ msg: 'Internal Server Error' });
    }
});