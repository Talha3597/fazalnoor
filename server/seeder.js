const mongoose= require('mongoose') 


const users = require ('./model/data')

const User = require('./model/user')

require('dotenv').config();


require('./model/db');


const importData = async () => {
  try {
    
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    
    

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
