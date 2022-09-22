// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  return res.status(404).json({ "Error Message": "Request not found" });
}
