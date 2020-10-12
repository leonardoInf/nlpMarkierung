const app = require("express")();
const { spawn } = require("child_process");

app.use(require("body-parser").json());
app.use(require("cors")());

app.post("/", (req, res) => {
  // TODO: Fix this lmao
  let noNewlines =  req.body.text.replace("\n", " ");
  const arg = `"${noNewlines}"`;
  console.log(noNewlines);

  const cmd = spawn("python", ["reduzieren.py", arg], {
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

app.listen(process.env.PORT, () => {
  console.log(`Server wurde gestartet auf Port ${process.env.PORT}.`);
});
