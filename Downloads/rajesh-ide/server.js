const os = require("os")
const { exec } = require("child_process")
const simpleGit = require("simple-git")
const git = simpleGit()
const express = require("express")
const http = require("http")
const socket = require("socket.io")
const fs = require("fs")
const path = require("path")
const pty = require("node-pty")
const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.json())
app.use(express.static("public"))

const WORKSPACE = path.join(__dirname,"workspace")

// list files
app.get("/files",(req,res)=>{

function readDir(dir){

const items = fs.readdirSync(dir)

return items.map(item=>{

const full = path.join(dir,item)

const stat = fs.statSync(full)

if(stat.isDirectory()){

return {
name:item,
type:"folder",
children:readDir(full)
}

}else{

return {
name:item,
type:"file"
}

}

})

}

res.json(readDir(WORKSPACE))

})

// open file
app.get("/open",(req,res)=>{
  const file = path.join(WORKSPACE,req.query.name)
  const content = fs.readFileSync(file,"utf8")
  res.send(content)
})

// save file
app.post("/save",(req,res)=>{
  const file = path.join(WORKSPACE,req.body.name)
  fs.writeFileSync(file,req.body.content)
  res.send("saved")
})
// RUN CODE API
app.post("/run",(req,res)=>{

const file = path.join(WORKSPACE,req.body.name)

exec(`node ${file}`,(err,stdout,stderr)=>{

if(err){
res.send(stderr)
return
}

res.send(stdout)

})

})

// run javascript file
app.post("/run",(req,res)=>{
  const file = path.join(WORKSPACE,req.body.name)

  exec(`node ${file}`,(err,stdout,stderr)=>{
    if(err){
      res.send(stderr)
      return
    }
    res.send(stdout)
  })

})

let shell = os.platform() === "win32" ? "powershell.exe" : "bash"

const ptyProcess = pty.spawn(shell,[],{
  name:"xterm-color",
  cols:80,
  rows:30,
  cwd:process.cwd(),
  env:process.env
})

io.on("connection",(socket)=>{

  ptyProcess.on("data",(data)=>{
    socket.emit("terminal-output",data)
  })

  socket.on("terminal-input",(data)=>{
    ptyProcess.write(data)
  })

})
// GIT STATUS
app.get("/git-status", async (req,res)=>{

try{

const status = await git.status()

res.json(status)

}catch(err){

res.send(err.toString())

}

})
// GIT COMMIT
app.post("/git-commit", async (req,res)=>{

try{

await git.add(".")

await git.commit(req.body.message)

res.send("Commit successful")

}catch(err){

res.send(err.toString())

}

})
// AI endpoint
app.post("/ai",(req,res)=>{

const question = req.body.question

const response = "AI response placeholder for: " + question

res.send(response)

})
server.listen(3000,()=>{
  console.log("Rajesh IDE running at http://localhost:3000")
})