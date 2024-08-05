import { useEffect, useState } from "react";
import { Layout, Typography, Row, Col, Badge } from "antd";
import Task from "@/model/Task";
import Taskboard from "@/components/Taskboard";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    updateTasks();
  }, []);

  const updateTasks = async () => {
    const [allResponse, activeResponse, completedResponse] = await Promise.all([
      fetch("/api/tasks/all"),
      fetch("/api/tasks/active"),
      fetch("/api/tasks/completed"),
    ]);

    setAllTasks(await allResponse.json());
    setActiveTasks(await activeResponse.json());
    setCompletedTasks(await completedResponse.json());
  };

  const handleCompleteTask = async (taskId: number) => {
    await fetch("/api/tasks/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, completed: true }),
    });
    updateTasks();
  };

  return (
    <Layout className="layout">
      <Header>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Taskboard System
        </Title>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Badge count={activeTasks.length} showZero>
              <Taskboard
                title="In Progress"
                tasks={activeTasks}
                onComplete={handleCompleteTask}
              />
            </Badge>
          </Col>
          <Col span={8}>
            <Badge count={allTasks.length} showZero>
              <Taskboard title="To-Do" tasks={allTasks} />
            </Badge>
          </Col>
          <Col span={8}>
            <Badge count={completedTasks.length} showZero>
              <Taskboard title="Completed" tasks={completedTasks} />
            </Badge>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}