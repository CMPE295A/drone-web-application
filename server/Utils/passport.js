const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const Users = require('../Models/UserModel');
const {secretKey} = require("./config");

// Setup work and export for the JWT passport strategy
function auth() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, callback) => {
        // console.log('JWT payload:', jwt_payload);

        const user_id = jwt_payload._id;
            Users.findById(user_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                // console.log('User found:', results);

                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

// exports.auth = auth;
auth();
exports.checkAuth = passport.authenticate("jwt", { session: false });