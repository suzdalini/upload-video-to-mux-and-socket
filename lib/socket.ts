import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

let io: IOServer | undefined;

export const setupSocketIO = (server: HttpServer) => {
    if (!io) {
        io = new IOServer(server, {
            path: "/api/socketio",
        });

        io.on('connection', (socket: Socket) => {
            console.log('Client connected', socket.id);
          
            socket.on('testEvent', (data) => {
              console.log('Test event received:', data);
              socket.emit('testEventResponse', { message: 'Test event received successfully' });
            });
          
            socket.on('disconnect', () => {
              console.log('Client disconnected', socket.id);
            });
        });
    }

    return io;
};

export const sendPlaybackIdToClients = (playbackId: string) => {
    if (io) {
        io.emit("playbackId", playbackId);
    }
};
