import { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import TodoNote from "./TodoNote.jsx";
import TodoNoteForm from "./TodoNoteForm.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    user: "",
    todo: "",
    completed: false,
  });
  const [touched, setTouched] = useState({
    user: false,
    todo: false,
  });

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/todos");

    if (response.ok) {
      const todosData = await response.json();

      const userPromises = todosData.todos.map((item) =>
        fetch(`https://dummyjson.com/users/${item.userId}`).then((response) =>
          response.json()
        )
      );

      const usersData = await Promise.all(userPromises);

      const combinedData = todosData.todos.map((todo, index) => {
        const user = usersData[index];
        const name = user.firstName + " " + user.lastName;
        return {
          ...todo,
          user: name,
        };
      });

      setNotes(combinedData);
    } else {
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId =
      notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 1;

    const newNote = {
      id: newId,
      ...currentNote,
    };

    setNotes([...notes, newNote]);
    setCurrentNote({
      user: "",
      todo: "",
      complete: false,
    });
    setTouched({
      user: false,
      todo: false,
    });
  };

  const toggleComplete = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "markComplete":
        toggleComplete(action.id);
        break;
      case "deleteNote":
        deleteNote(action.id);
        break;
      default:
        console.error("Invalid action type");
    }
  }

  const [_, dispatch] = useReducer(reducer, notes);

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="mb-5">Notes</h1>
        <TodoNoteForm
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          handleSubmit={handleSubmit}
          touched={touched}
          setTouched={setTouched}
        />
        <Row xs={1} md={2} lg={4} className="g-4">
          {notes.map((item) => (
            <Col key={item.id}>
              <TodoNote item={item} dispatch={dispatch} />
            </Col>
          ))}
        </Row>
      </Stack>
    </Container>
  );
}

export default App;
