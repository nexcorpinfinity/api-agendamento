export function emitConsole(message: unknown): void {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    console.error(message);
}
