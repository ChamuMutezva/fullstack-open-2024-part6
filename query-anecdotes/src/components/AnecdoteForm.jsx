import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createAnecdotes } from "../request";
// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({ dispatch, type }) => {
    const queryClient = useQueryClient();
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
        },
    });
    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        newAnecdoteMutation.mutate({ content, votes: 0 });
        event.target.anecdote.value = "";
        console.log("new anecdote");
        dispatch({ type, payload: { content } });
      
        console.log(content);
    };
    // console.log(notification);
    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
