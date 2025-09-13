import { Card, Button, Stack } from "react-bootstrap";

const TodoNote = ({ item, dispatch }) => {
  return (
    <Card bg="light">
      <Card.Body>
        <Card.Title>{item.user}</Card.Title>
        <Card.Text>{item.todo}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-light border-0 text-end text-muted">
        <Stack direction="horizontal" gap={2}>
          <Button
            variant={`${item.completed ? "success" : "warning"}`}
            size="sm"
            onClick={() => dispatch({ type: "markComplete", id: item.id })}
          >
            {item.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="ms-auto"
            onClick={() => dispatch({ type: "deleteNote", id: item.id })}
          >
            Delete
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default TodoNote;
