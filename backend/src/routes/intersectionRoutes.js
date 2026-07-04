import { Router } from "express";

const router = Router();

// Discord Interactions Endpoint
// Discord will send POST requests here 

router.post("/", (req, res) => {
    console.log("Intersection Received");
    console.log(req.body);

    return res.status(200).json({
        success: true,
        message: "Interaction received successfully.",
    });
});

export default router;
