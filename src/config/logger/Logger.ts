import fs from 'fs';
import path from 'path';

import { LogLevel } from '../../types/LogLevel';

abstract class BaseLogger {
    public abstract log(message: string, level: LogLevel): void;

    protected formatMessage(message: string, level: LogLevel): string {
        const timestamp = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
        });
        return `[${timestamp}] [${level}] ${message}`;
    }
}

class Logger extends BaseLogger {
    private logDirectory: string;
    private currentDate: Date;

    public constructor(logDirectory = 'logs', currentDate?: Date) {
        super();
        this.logDirectory = logDirectory;
        this.currentDate = currentDate ? currentDate : new Date();
        this.createLogDirectory();
    }

    private createLogDirectory(): void {
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
    }

    private getLogFilePath(level: LogLevel): string {
        const year = this.currentDate.getFullYear();
        const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(this.currentDate.getDate()).padStart(2, '0');

        const logFileName =
            level === LogLevel.ERROR || level === LogLevel.WARN
                ? 'error_warnings.log'
                : 'success.log';

        const logPath = path.join(this.logDirectory, `${year}`, `${month}`, `${day}`);

        fs.mkdirSync(logPath, { recursive: true });

        return path.join(logPath, logFileName);
    }

    public log(message: string, level: LogLevel): void {
        const formattedMessage = this.formatMessage(`${message}`, level);
        console.log('\x1b[43m\x1b[30m%s\x1b[0m', formattedMessage);

        const logFilePath = this.getLogFilePath(level);
        fs.appendFileSync(logFilePath, formattedMessage + '\n');
    }
}

export { Logger };
