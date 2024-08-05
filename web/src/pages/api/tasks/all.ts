import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTasks } from "@/modules/taskManager";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const allTasks = getAllTasks();
    res.status(200).json(allTasks);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
