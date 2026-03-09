const express = require("express")
const http = require("http")
const socket = require("socket.io")
const pty = require("node-pty")
const os = require("os")

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static("public"))

let shell = os.platform() === "win32" ? "powershell.exe" : "bash"

const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env
})

io.on("connection", (socket) => {

  ptyProcess.on("data", function(data) {
    socket.emit("terminal-output", data)
  })

  socket.on("terminal-input", (data) => {
    ptyProcess.write(data)
  })

})

server.listen(3000, () => {
  console.log("Rajesh IDE running at http://localhost:3000")
})