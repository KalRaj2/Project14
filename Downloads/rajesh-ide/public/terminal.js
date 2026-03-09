const socket = io()

const term = new Terminal()

term.open(document.getElementById("terminal"))

term.onData(data => {
    socket.emit("terminal-input", data)
})

socket.on("terminal-output", function(data){
    term.write(data)
})