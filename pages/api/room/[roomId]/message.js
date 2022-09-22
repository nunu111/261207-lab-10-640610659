import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomid = req.query.roomId;
    const messages = [];
    const roomIdx = rooms.findIndex((x) => x.roomId === roomid);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    for (const key2 of rooms[roomIdx].messages) {
      messages.push({
        messageId: key2.messageId,
        text: key2.text,
      });
    }
    return res.json({ ok: true, messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomid = req.query.roomId;

    const roomIdx = rooms.findIndex((x) => x.roomId === roomid);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    //read request body
    const text = req.body.text;
    if (typeof text !== "string")
      return res.status(404).json({ ok: false, message: "Invalid text input" });
    //create new id
    const newId = uuidv4();
    const newmessage = { messageId: newId, text: text };
    rooms[roomIdx].messages.push(newmessage);
    writeDB(rooms);

    return res.json({ ok: true, message: newmessage });
  }
}
