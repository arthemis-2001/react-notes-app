import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const TodoNoteForm = ({ currentNote, setCurrentNote, handleSubmit, touched, setTouched }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="bg-light">Add a New Note</h2>
      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          value={currentNote.user}
          placeholder="Enter name"
          onChange={(e) =>
            setCurrentNote({ ...currentNote, user: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, user: true })}
          isInvalid={touched.user && currentNote.user.length === 0}
        />
        <Form.Control.Feedback type="invalid">
          User Name should not be empty.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTodoText">
        <Form.Label>Todo Text</Form.Label>
        <Form.Control
          type="text"
          value={currentNote.todo}
          placeholder="Enter todo text"
          onChange={(e) =>
            setCurrentNote({ ...currentNote, todo: e.target.value })
          }
          onBlur={() => setTouched({ ...touched, todo: true })}
          isInvalid={touched.todo && currentNote.todo.length === 0}
        />
        <Form.Control.Feedback type="invalid">
          Todo Text should not be empty.
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={
          currentNote.user.length === 0 || currentNote.todo.length === 0
        }
      >
        Submit
      </Button>
    </Form>
  );
};

export default TodoNoteForm;
