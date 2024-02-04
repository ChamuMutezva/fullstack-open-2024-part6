import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList() {
    const anecdotes = useSelector((state) => {
        console.log(state.filter);
        if (state.filter === "") {
            return state.anecdotes;
        } else {
            return state.anecdotes.filter((anecdote) =>
                anecdote.content.includes(state.filter)
            );
        }
    });

    const handleVotes = (id, content) => {
        dispatch(updateAnecdote(id));
        dispatch(setNotification(content));
    };

    const dispatch = useDispatch();
    console.log(anecdotes);
    return (
        <div>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button
                                onClick={() =>
                                    handleVotes(anecdote.id, anecdote.content)
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
