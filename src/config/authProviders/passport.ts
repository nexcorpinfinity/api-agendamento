import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID is not defined');
} else if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('GOOGLE_CLIENT_SECRET is not defined');
} else if (!process.env.URL_API_APPLICATION_GOOGLE_REDIRECT) {
    throw new Error(
        'URL_API_APPLICATION_GOOGLE_REDIRECT is not defined insira a url da API no .env',
    );
}

export const configurePassport = (): void => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: `${process.env.URL_API_APPLICATION_GOOGLE_REDIRECT}/auth/google/callback`,
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
