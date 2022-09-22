import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  const result = [];
  for (const key of rooms) {
    result.push({
      roomId: key.roomId,
      roomName: key.roomName,
    });
  }
  return res.json({ ok: true, rooms: result });
}
