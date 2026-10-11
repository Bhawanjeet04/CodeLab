import { io } from 'socket.io-client';

const getBackendUrl = () => {
    if (process.env.REACT_APP_BACKEND_URL) {
        return process.env.REACT_APP_BACKEND_URL;
    }

    if (typeof window !== 'undefined') {
        const { protocol, hostname, port } = window.location;

        if (port === '3000') {
            return `${protocol}//${hostname}:5000`;
        }

        return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    }

    return 'http://localhost:5000';
};

export const initSocket = async () => {
    const options = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(getBackendUrl(), options);
};
