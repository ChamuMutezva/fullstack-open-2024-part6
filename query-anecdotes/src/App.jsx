import { useReducer } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import NotificationContext from "./components/NotificationContext";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { fetchAnecdotes, updateAnecdote } from "./request";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NEW_ANCECDOTE":
            return action.payload;
        case "VOTED": {
            console.log(state);
            return {
                ...state,
                content: `anecdote ${action.payload} voted`,
            };
        }
        case "RESET": {
            return {
                content: action.payload,
            };
        }

        default:
            return state;
    }
};

const App = () => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        { content: "" }
    );
    const queryClient = useQueryClient();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["anecdotes"],
        queryFn: fetchAnecdotes,
        retry: 3,
    });

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
        },
    });

    if (isPending) {
        return <div>loading data...</div>;
    }

    if (isError) {
        if (error.name === "AxiosError") {
            return (
                <span>
                    Error: anecdote service not available , due to a server
                    error
                </span>
            );
        } else {
            return <span>Error: {error.message}</span>;
        }
    }

    const anecdotes = data;

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1,
        });

        notificationDispatch({ type: "VOTED", payload: anecdote.content });
        // resetNotification;

        setTimeout(
            () => notificationDispatch({ type: "RESET", payload: "" }),
            5000
        );

    };

    /*
    const resetNotification = setTimeout(
        () => notificationDispatch({ type: "RESET", payload: "" }),
        5000
    );
*/
    return (
        <NotificationContext.Provider value={[anecdotes]}>
            <h3>Anecdote app</h3>

            <Notification notification={notification?.content} />
            <AnecdoteForm
                dispatch={notificationDispatch}
                type={"NEW_ANCECDOTE"}
                timeout={setTimeout(
                    () => notificationDispatch({ type: "RESET", payload: "" }),
                    5000
                )}
            />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </NotificationContext.Provider>
    );
};

export default App;
