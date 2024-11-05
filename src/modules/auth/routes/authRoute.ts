import { Router } from 'express';
import passport from 'passport';

import { configurePassport } from '../../../config/authProviders/passport';
import { BusinessRepository } from '../../business/repository/BusinessRepository';
import { UserRepository } from '../../users/repository/UserRepository';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';

const authRoute = Router();

const userRepository = new UserRepository();
const businessRepository = new BusinessRepository();

const authService = new AuthService(userRepository, businessRepository);

const authController = new AuthController(authService);

configurePassport();

authRoute.get('/google', (req, res, next) => {
    const accountType = (req.query.accountType as string) || 'client';
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: accountType,
    })(req, res, next);
});

authRoute.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) =>
    authController.authWithGoogle(req, res),
);

authRoute.post('/', (req, res) => authController.auth(req, res));

export { authRoute };
