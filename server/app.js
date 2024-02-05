import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 4000;
const secretKey = "poueoirqeuifhe";

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin:  "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get("/", (req, res) => {
    return res.send("hello world!")
})

// app.get("/login", (req, res) => {
//     return res.send({message: "Login"})
// })

// const usertoken = false;

// io.use((socket, next) => {
//     // cookieParser()(socket.request, socket.request.resume, (err) => {
//     //     if(err) return next(err);

//     //     const token = socket.request.cookies.token;
//     //     if(!token) return next( new Error("Authentication error!"));

//     //     const decoded = jwt.verify(token, secretKey);
//     //     next();
//     // })
//     if(usertoken) {
//         next();
//     }
// })


io.on("connection", (socket) => {
    console.log("user is connected ........");
    console.log(socket.id);

    socket.on("message", ({ message, room }) => {
        // socket.broadcast.emit("receive-message", message); // it will send the message to everyone
        // io.to(room).emit("receive-message", message);
        socket.to(room).emit("receive-message", message);
    })

    socket.on("join-room", (roomName) => {
        socket.join(roomName);
    })

    socket.on("disconnect", () => {
        console.log('user disconnected .....', socket.id);

    })
})


server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

