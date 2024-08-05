import { useEffect, useState } from "react";
import { Layout, Typography, Row, Col, Badge, Button } from "antd";
import Task from "@/model/Task";
import Taskboard from "@/components/Taskboard";
import TaskList from "@/components/TaskList";

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
    <Layout style={{ minHeight: '100vh', background: 'white' }}>
      <Header style={{ padding: '0 24px', background: '#fff' }}>
        <Title level={2} style={{ color: '#333' }}>Task Board</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Taskboard title="To-Do" tasks={allTasks} />
          </Col>
          <Col xs={24} md={8}>
            <Taskboard
              title="In Progress"
              tasks={activeTasks}
              onComplete={handleCompleteTask}
            />
          </Col>
          <Col xs={24} md={8}>
            <Taskboard title="Completed" tasks={completedTasks} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}