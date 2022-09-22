import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const rooms = readDB();
  if (req.method === "DELETE") {
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const messagesIdx = rooms[roomIdx].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (messagesIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    rooms[roomIdx].messages.splice(messagesIdx, 1);

    writeDB(rooms);
    return res.json({ ok: true });
  }
}
