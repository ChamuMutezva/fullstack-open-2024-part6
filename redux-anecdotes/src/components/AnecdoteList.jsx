import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteList() {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <div>
            {" "}
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button
                                onClick={() =>
                                    dispatch(updateAnecdote(anecdote.id))
                                }
                            >
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default AnecdoteList;
