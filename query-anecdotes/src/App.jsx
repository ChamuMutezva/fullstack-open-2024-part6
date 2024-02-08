import axios, { AxiosError, AxiosHeaders } from "axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { fetchAnecdotes, updateAnecdote } from "./request";

const App = () => {
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
        console.log("vote");
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1,
        });
    };
    /*
    const anecdotes = [
        {
            content: "If it hurts, do it more often",
            id: "47145",
            votes: 0,
        },
    ];
*/
    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

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
        </div>
    );
};

export default App;
