import { NextApiRequest, NextApiResponse } from "next";
import { sendPlaybackIdToClients } from "@/lib/socket";

export function GET(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    console.log("Webhook received:", body);

    if (body?.type === "video.asset.ready") {
        const playbackId = body.data.playback_ids[0].id;
        console.log("Playback ID:", playbackId);

        // Отправка playbackId всем подключенным клиентам
        sendPlaybackIdToClients(playbackId);
    }

    res.status(200).send("Webhook received");
}
