const app = require("express")();
const { spawn } = require("child_process");

app.use(require("body-parser").json());

app.post("/", (req, res) => {
  const cmd = spawn("python", ["reduzieren.py", `"${req.body.text}"`], {
    shell: true,
  });
  cmd.stdout.on("data", (data) => {
      try{
      const pythonAntwort = data.toString();
      console.log(pythonAntwort);
      res.send(JSON.parse(pythonAntwort));
      }
      catch(err){
          res.send("Fehler: Ungültiger Text.")
          throw err;
      }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server wurde gestartet auf Port ${process.env.PORT}.`);
});