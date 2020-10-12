const app = require("express")();
const { spawn } = require("child_process");


app.post("/", (req, res) => {
    const dir = spawn("python", ["reduzieren.py", req.body.text], { shell: true });
    dir.stdout.on("data", (data) => res.send(data.toString()));
});

