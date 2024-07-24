export function getString(msg: any): string {
    if (typeof msg === 'string') {
        return msg;
    } else if (msg instanceof Error) {
        return msg.message;
    } else if (Array.isArray(msg)) {
        msg = msg.map((m) => getString(m));
        return msg.join(';');
    } else if (msg === null || msg === undefined) {
        return '';
    } else if (typeof msg === 'object' && msg.toString) {
        return msg.toString();
    } else {
        return String(msg);
    }
}