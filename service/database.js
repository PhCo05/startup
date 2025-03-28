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
      { 
        $inc: { calories: calories } // Increment calories for that day
      },
      { upsert: true } // Create new entry if not found
    );
  }
  
  async function getCalorieEntry(userId, date) {
    return calCollection.findOne({ userId: userId, date: date });
  }
  
  async function getWeeklyCalories(email) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Get past 7 days
    startDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time
  
    const formattedStartDate = startDate.toISOString().split('T')[0]; // Get just the date part
  
    console.log('Formatted Start Date for the past week:', formattedStartDate); // Log formatted start date
  
    const aggregatedData = await db.collection('calories').aggregate([
      { 
        $match: { 
          email, 
          date: { $gte: new Date(formattedStartDate) } // Filter for dates in the last 7 days
        }
      },
      { 
        $group: { 
          _id: "$date", 
          totalCalories: { $sum: "$calories" } // Sum calories per day
        }
      },
      { 
        $sort: { _id: 1 } // Sort by date (ascending)
      }
    ]).toArray();
  
    console.log('Aggregated Weekly Calorie Data:', aggregatedData); // Log aggregated data
  
    return aggregatedData;
  }

  async function addFoodEntry(userId, foodName, calories, date) {
    await calCollection.insertOne({ userId, foodName, calories, date });
  }

  module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addOrUpdateCalorieEntry,
    getCalorieEntry,
    getWeeklyCalories,
    addFoodEntry,
  };