const app = require("express")();
const { spawn } = require("child_process");
const serveStatic = require('serve-static')

app.use(require("body-parser").json());
app.use(require("cors")());

app.post("/", (req, res) => {
  const noNewlines = req.body.text.replace(/\s/g, " ");
  const cmd = spawn("python3", ["reduzieren.py", `"${noNewlines}"`], {
    shell: true,
  });
  cmd.stdout.on("data", (data) => {
    try {
      const pythonAntwort = data.toString();
      console.log(pythonAntwort);
      res.send(JSON.parse(pythonAntwort));
    } catch (err) {
      res.send("Fehler: Ungültiger Text.");
      throw err;
    }
  });
});

app.use(serveStatic('../frontend/build'));

app.listen(process.env.PORT, () => {
  console.log(`Server wurde gestartet auf Port ${process.env.PORT}.`);
});
