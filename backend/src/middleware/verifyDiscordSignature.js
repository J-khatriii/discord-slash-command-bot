import { verifyKey } from "discord-interactions";

const verifyDiscordSignature = async (req, res, next) => {    
    const signature = req.header("X-Signature-Ed25519");
    const timestamp = req.header("X-Signature-Timestamp");

    const isValidRequest = await verifyKey(
        req.rawBody,
        signature,
        timestamp,
        process.env.DISCORD_PUBLIC_KEY,
    );

    if (!signature || !timestamp) {
        return res.status(401).json({
            success: false,
            message: "Missing Discord signature headers.",
        });
    }

    if (!isValidRequest) {
        return res.status(401).json({
            success: false,
            message: "Invalid Discord request signature.",
        });
    }

  next();
};

export default verifyDiscordSignature;
