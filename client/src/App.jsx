import { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography, Box, Stack } from '@mui/material';


function App() {

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [roomName, setRoomName] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  }

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  }

  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      // console.log("connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("receive-message", (data) => {
      setAllMessage((message) => [...message, data]);
    });

    return () => {
      socket.disconnect();
    };

  }, []);


  return (
    <>

      <Container maxWidth="sm">

        <Box sx={{ height: 300 }}/>
        <Typography variant='h6' component="div" gutterBottom>
          {socketId}
        </Typography>

        <form onSubmit={joinRoomHandler}>
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            id='outlined-basic'
            label="Join"
            variant="outlined"
          />
          <Button type="submit" variant='contained' color='primary'>Join</Button>
        </form>

        <form onSubmit={handleSubmit}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id='outlined-basic'
            label="Message"
            variant="outlined"
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id='outlined-basic'
            label="Room"
            variant="outlined"
          />
          <Button type="submit" variant='contained' color='primary'>Send</Button>
        </form>

        <Stack>
          {
            allMessage.map((val, indx) => {
              console.log('val', val);
              return (
                <Typography key={indx} variant='h6' component="div" gutterBottom>{val}</Typography>
              )
            })
          }
        </Stack>
      </Container>
    </>
  )
}


export default App;

