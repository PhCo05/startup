const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('rental');
const userCollection = db.collection('user');
const calCollection = db.collection('calories');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

  function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function addUser(user) {
    await userCollection.insertOne(user);
  }
  
  async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
  }

  async function addOrUpdateCalorieEntry(userId, date, calories) {
    await calCollection.updateOne(
      { userId: userId, date: date }, // Find entry for this user and date
      { $set: { userId: userId, date: date, calories: calories } }, // Update or insert
      { upsert: true } // Create new entry if not found
    );
  }
  
  async function getCalorieEntry(userId, date) {
    return calCollection.findOne({ userId: userId, date: date });
  }
  
  async function getWeeklyCalories(userId) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Get last 7 days
  
    return calCollection
      .find({ userId: userId, date: { $gte: sevenDaysAgo.toISOString().split('T')[0] } })
      .sort({ date: 1 })
      .toArray();
  }

  module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addOrUpdateCalorieEntry,
    getCalorieEntry,
    getWeeklyCalories,
  };