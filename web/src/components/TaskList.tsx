import { List, Button, Row, Col } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Task from "@/model/Task";

interface TaskListProps {
  tasks: Task[];
  onComplete?: (taskId: number) => void;
}

function TaskList({ tasks, onComplete }: TaskListProps) {
  // Split tasks into pairs for horizontal grouping
  const groupedTasks = tasks.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, [] as Task[][]);

  return (
    <div>
      {groupedTasks.map((group, index) => (
        <Row key={index} gutter={16}>
          {group.map((task) => (
            <Col span={12} key={task.id}>
              <List.Item
                actions={[
                  onComplete && !task.completed && (
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => onComplete(task.id)}
                    >
                      Complete
                    </Button>
                  ),
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  title={<span style={{ fontWeight: 'bold' }}>{task.title}</span>}
                  description={`Group: ${task.group}`}
                />
              </List.Item>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default TaskList;