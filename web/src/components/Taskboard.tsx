import { Card, Typography } from "antd";
import Task from "@/model/Task";
import TaskList from "./TaskList";

const { Title } = Typography;

interface TaskboardProps {
  title: string;
  tasks: Task[];
  onComplete?: (taskId: number) => void;
}

function Taskboard({ title, tasks, onComplete }: TaskboardProps) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Title level={4} style={{ textAlign: "center" }}>{title}</Title>
      <TaskList tasks={tasks} onComplete={onComplete} />
    </Card>
  );
}

export default Taskboard;
