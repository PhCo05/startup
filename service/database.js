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
    startDate.setDate(startDate.getDate() - 6); // Get past 7 days
    startDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time

    // Get end of the day timestamp for the start date
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Set it to 6 days after the start date
    endDate.setHours(23, 59, 59, 999); // Set time to end of the day

    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    console.log('Formatted Start Date for the past week:', formattedStartDate); // Log formatted start date
    console.log('Formatted End Date for the past week:', formattedEndDate); // Log formatted end date

    const aggregatedData = await db.collection('calories').aggregate([
        { 
            $match: { 
                email, 
                date: { 
                    $gte: new Date(formattedStartDate), 
                    $lte: new Date(formattedEndDate) // Match only the dates in the last 7 days
                }
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