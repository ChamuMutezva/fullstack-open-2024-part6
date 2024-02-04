import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { filterChange } from "./reducers/filterReducer";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, []);

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        console.log(event.target.value);
        dispatch(filterChange(event.target.value));
    };

    const style = {
        marginBottom: 10,
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            <div style={style}>
                filter <input onChange={handleChange} />
            </div>
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
