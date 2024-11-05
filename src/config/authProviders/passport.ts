import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const configurePassport = (): void => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    // retorna o perfil e pega na controller é importado na router de auth
                    return done(null, profile);
                } catch (error) {
                    console.log(error);
                    return done(error, undefined);
                }
            },
        ),
    );
};
