import { FC } from "react";
import Video from "next-video";
import Player from 'next-video/player';
import BackgroundVideo from 'next-video/background-video';


interface PlayerProps {
    playbackId: string;
}

const PlayerComponent: FC<PlayerProps> = ({ playbackId }) => {
    const videoUrl = `https://stream.mux.com/${playbackId}.m3u8`;

    return (
        <div>
            <Video
                style={{ display: 'grid', width: '600px', aspectRatio: '16/9', borderRadius: '50px' }}
                disableTracking
                src={videoUrl}
                className="w-[500px] max-w-[500px] rounded-2xl"
                controls
                autoPlay
            />
        </div>
    );
};

export default PlayerComponent;
