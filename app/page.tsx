
"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Player from "../components/Player";
import Upload from "../components/Upload";

const Home: React.FC = () => {
    const [playbackId, setPlaybackId] = useState<string | null>(null);
    const [uploadId, setUploadId] = useState<string | null>(null);

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance: Socket = io("https://dp2p.neventa.center", {
            path: "/socket.io",
        });

        socketInstance.on("connect", () => {
            console.log("Connected to socket.io server");
        });

        socketInstance.on("testEvent", (data: { message: string }) => {
            setPlaybackId(data.message);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Загрузка видео</h1>
            <Upload
                onUploadSuccess={(uploadId) => {
                    setUploadId(uploadId);
                    console.log("Upload ID:", uploadId);
                }}
            />

            {uploadId && <p>uploadId: {uploadId}</p>}
            {playbackId && <p>playbackId: {playbackId}</p>}

            {playbackId && <Player playbackId={playbackId} />} 
        </div>
    );
};

export default Home;





// "use client";
// import { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";

// const Home: React.FC = () => {
//     const [message, setMessage] = useState<string | null>(null);
//     const [socket, setSocket] = useState<Socket | null>(null);

//     useEffect(() => {
//         const socketInstance: Socket = io("https://dp2p.neventa.center", {
//             path: "/socket.io",
//         });

//         socketInstance.on("connect", () => {
//             console.log("Connected to socket.io server");
//         });

//         socketInstance.on("testEvent", (data: { message: string }) => {
//             console.log("Received test event:", data.message);
//             setMessage(data.message);
//         });

//         setSocket(socketInstance);

//         return () => {
//             socketInstance.disconnect();
//         };
//     }, []);

//     return (
//         <div>
//             <p>Show socket message here: {message}</p>
//         </div>
//     );
// };

// export default Home;





