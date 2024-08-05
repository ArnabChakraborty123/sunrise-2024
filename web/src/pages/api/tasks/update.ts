import type { NextApiRequest, NextApiResponse } from "next";
import { updateTask } from "@/modules/taskManager";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, ...updatedTask } = req.body;
    updateTask(id, updatedTask);
    res.status(200).json({ message: "Task updated successfully" });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
