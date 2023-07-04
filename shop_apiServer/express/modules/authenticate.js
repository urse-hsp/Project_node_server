// // 文件：app/authenticate/init.js
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     findUser(username, (err, user) => {
//       if (err) {
//         return done(err)
//       }

//       // 用户未找到
//       if (!user) {
//         return done(null, false)
//       }
//     })
//   })
// )
// // 文件：app/authentication/middleware.js
// function authenticationMiddleware() {
//   return function (req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
//     res.redirect('/')
//   }
// }
