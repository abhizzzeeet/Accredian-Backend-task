const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// 📝 API to Submit Referral
app.post("/api/referrals", async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseName } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !courseName) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const newReferral = await prisma.referral.create({
            data: { referrerName, referrerEmail, refereeName, refereeEmail, courseName },
        });

        res.status(201).json({ message: "Referral saved!", referral: newReferral });
    } catch (error) {
        console.error("Error saving referral:", error);
        res.status(500).json({ error: "Failed to save referral." });
    }
});

// 📝 API to Get All Referrals
app.get("/api/referrals", async (req, res) => {
    try {
        const referrals = await prisma.referral.findMany();
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch referrals." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
