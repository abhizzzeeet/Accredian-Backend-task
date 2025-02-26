const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// Email Configuration using Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your App Password
    },
});

// API to Submit Referral
app.post("/api/referrals", async (req, res) => {
    console.log("Received Request Body:", req.body); 
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseName } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !courseName) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const newReferral = await prisma.referral.create({
            data: { referrerName, referrerEmail, refereeName, refereeEmail, courseName },
        });
        // 🔹 Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: refereeEmail, // Sending to the referred person
            subject: "You've Been Referred for a Course!",
            text: `Hello ${refereeName},\n\n${referrerName} has referred you for the "${courseName},\n\n his/her email: ${referrerEmail} " course.\nCheck it out and enroll soon!\n\nBest Regards,\nYour Team`,
        };

        // 🔹 Send Email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "Referral saved & email sent!", referral: newReferral });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to save referral or send email." });
    }

});

// API to Get All Referrals
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
