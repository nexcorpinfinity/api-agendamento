// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Request, Response } from 'express';

// import { ErrorException } from '../../../utils/ErrorException';
// // import AuthService from '../services/AuthService';

// export class AuthController {
//     // private readonly authService: AuthService;

//     public constructor() {
//         // this.authService = new AuthService();
//     }

//     public async auth(req: Request, res: Response): Promise<Response> {
//         const { email, password } = req.body;
//         console.log(req.body);
//         if (!email || !password) {
//             return res.status(401).json({ status: 400, errors: 'Credenciais inválidas' });
//         }

//         try {
//             // const tokenReturn = await this.authService.autenticarUsuario(email, password);

//             // if (tokenReturn === null) {
//             //     return res.status(401).json({ status: 400, errors: 'Usuário não existe' });
//             // }

//             // return res.status(200).json(tokenReturn);
//         } catch (error: any) {
//             console.error(error);
//             if (error instanceof ErrorException) {
//                 return res.status(error.statusCode).json({
//                     status: error.statusCode,
//                     error: error.errors,
//                 });
//             } else {
//                 return res.status(500).json({
//                     status: 500,
//                     error: 'Internal Server Error',
//                 });
//             }
//         }
//     }
// }
