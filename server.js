const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

let answers = [];

app.post("/answer", async (req, res) => {
    const data = req.body;

    answers.push(data);

    console.log("Answer received:", data);

    // EMAIL NOTIFICATION
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "YOUR_EMAIL@gmail.com",
                pass: "YOUR_APP_PASSWORD"
            }
        });

        await transporter.sendMail({
            from: "Love App ❤️",
            to: "YOUR_EMAIL@gmail.com",
            subject: "New Response Received",
            text: `
Question: ${data.question}
Answer: ${data.answer}
Reason: ${data.reason || "none"}
Time: ${data.time}
            `
        });

    } catch (err) {
        console.log("Email error:", err);
    }

    res.json({ success: true });
});

app.get("/answers", (req, res) => {
    res.json(answers);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
