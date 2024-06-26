import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import type { NextApiRequest, NextApiResponse } from "next";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const upload = await mux.video.uploads.create({
            cors_origin: "http://localhost:3000",
            new_asset_settings: {
                playback_policy: ["public"],
                encoding_tier: "baseline",
            },
        });

        return NextResponse.json({
            uploadUrl: upload.url,
            uploadId: upload.id,
        });
    } catch (error: any) {
        console.error("Error creating upload URL:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
