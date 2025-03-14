import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === "POST") {
      const { email, password } = req.body;
  
      if (email === "user@example.com" && password === "password123") {
        return res.status(200).json({ id: "1", email });
      } else {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    }
  
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  