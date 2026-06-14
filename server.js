const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// this stores answers temporarily
let answers = [];

app.post("/answer", (req, res) => {
    const data = req.body;

    answers.push({
        ...data,
        id: answers.length + 1,
        time: new Date()
    });

    console.log("New answer:", data);

    res.json({ success: true });
});

// SEE ALL ANSWERS (THIS IS WHAT YOU WANT)
app.get("/answers", (req, res) => {
    res.json(answers);
});

// OPTIONAL: see latest answer only
app.get("/latest", (req, res) => {
    res.json(answers[answers.length - 1] || {});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
