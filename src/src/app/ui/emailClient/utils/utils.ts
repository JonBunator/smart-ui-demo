export function toLocaleTimeNoSeconds(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    return date.toLocaleTimeString(undefined, options);;
}