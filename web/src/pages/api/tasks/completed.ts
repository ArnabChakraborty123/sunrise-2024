import type { NextApiRequest, NextApiResponse } from "next";
import { getCompletedTasks } from "@/modules/taskManager";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const completedTasks = getCompletedTasks();
    res.status(200).json(completedTasks);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
