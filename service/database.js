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
    await calCollection.insertOne({
      userId,
      foodName,
      calories,
      timestamp: new Date()  // <-- store the actual timestamp
    });
  }
  
  async function getTodayCalories(userId) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
  
    return calCollection.find({
      userId,
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).toArray();
  }
  
  
  async function getWeeklyCalories(email) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Include today and past 6 days
    startDate.setHours(0, 0, 0, 0);
  
    return await calCollection.aggregate([
      {
        $match: {
          userId: email,
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          totalCalories: { $sum: "$calories" }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
  }


async function addFoodEntry(userId, foodName, calories) {
  await calCollection.insertOne({
    userId,
    foodName,
    calories,
    timestamp: new Date()  // store full datetime
  });
}

  module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addOrUpdateCalorieEntry,
    getTodayCalories,
    getWeeklyCalories,
    addFoodEntry,
  };