const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialize(passport, prisma) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { username }});
            if (!user) {
                return done(null, false, { message: 'No user with that username' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password Incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy(authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { id }});
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;