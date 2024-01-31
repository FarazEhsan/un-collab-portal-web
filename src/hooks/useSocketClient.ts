import {useEffect, useRef} from 'react';
import io, {Socket} from 'socket.io-client';

const useSocketClient = () => {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080';
    const socketRef = useRef<Socket>();

    useEffect(() => {
        const socketIo = io(url);

        socketIo.on('connect', () => {
            console.log('connected');
        });

        socketIo.on('connect_error', (error) => {
            console.error('Connection failed', error);
        });

        socketRef.current = socketIo;

        return () => {
            if (socketRef.current) {
                socketRef.current.off('connect');
                socketRef.current.off('connect_error');
                socketRef.current.disconnect();
            }
        };
    }, [url]);

    return socketRef.current;
};

export default useSocketClient;
