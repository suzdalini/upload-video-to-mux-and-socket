import { NextRequest, NextResponse } from "next/server";
import { Server as HttpServer } from "http";
import { setupSocketIO } from "@/lib/socket";

export const config = {
    api: {
        bodyParser: false,
    },
};

let io: ReturnType<typeof setupSocketIO> | undefined;

export function GET(req: NextRequest) {
    if (!io) {
        console.log("Initializing Socket.io server...");
        const httpServer: HttpServer = req as any;
        io = setupSocketIO(httpServer);
    } else {
        console.log("Socket.io server already initialized.");
    }
    return new NextResponse(null, { status: 200 });
}
