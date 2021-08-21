const bcrypt =require('bcryptjs')

 const users = [
  { employeeNo:'1',
    username: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNo:'000000',
    salary:'00000',
    role:'superAdmin'
  },]
  module.exports = users