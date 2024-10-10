import fs from 'fs';
import path from 'path';
import { LogLevel } from '../types/Enums';

export class Logger {
    private logDirectory: string;
    private logFile: string;

    constructor(logDirectory = 'logs', logFile = 'app.log') {
        this.logDirectory = logDirectory;
        this.logFile = logFile;

        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
    }

    protected info(message: string): void {
        this.log(message, LogLevel.INFO);
    }

    protected warn(message: string): void {
        this.log(message, LogLevel.WARN);
    }

    protected error(message: string): void {
        this.log(message, LogLevel.ERROR);
    }

    private log(message: string, level: LogLevel): void {
        const timestamp = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
        });

        const formattedMessage = `[${timestamp}] [${level}] ${message}`;

        console.log('[LOG]', formattedMessage);

        fs.appendFileSync(path.join(this.logDirectory, this.logFile), formattedMessage + '\n');
    }
}
