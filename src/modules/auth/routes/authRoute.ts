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

// rota de login normal
authRoute.post('/', (req, res) => authController.auth(req, res));

authRoute.get('/google', (req, res, next) => {
    const accountType = (req.query.accountType as string) || 'client';
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: accountType,
    })(req, res, next);
});

authRoute.get(
    '/google/callback',
    (req, res, next) => {
        // caso o usuario começa fazer login e cancela, ele redireciona para essa rota q seria a  home / do front
        if (req.query.error === 'access_denied') {
            return res.redirect(`${process.env.FRONT_END}?error=access_denied`);
        }
        return next();
    },
    passport.authenticate('google', { session: false }),
    (req, res) => authController.authWithGoogle(req, res),
);

export { authRoute };
