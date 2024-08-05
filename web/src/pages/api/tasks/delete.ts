import type { NextApiRequest, NextApiResponse } from "next";
import { deleteTask } from "@/modules/taskManager";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    deleteTask(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
