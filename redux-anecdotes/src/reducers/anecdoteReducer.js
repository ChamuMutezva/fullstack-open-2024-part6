const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
    console.log("state now: ", state);
    console.log("action", action);
    console.log("type", action.type);
    console.log("payload", action.payload);

    switch (action.type) {
        case "NEW_ANECDOTE":
            return state.concat(action.payload);
        case "UPDATE_ANECDOTE": {
            const id = action.payload.id;
            const anecdote = state.find((data) => data.id === id);
            const updateAnecdote = { ...anecdote, votes: anecdote?.votes + 1 };
            return state.map((state) =>
                state.id !== id ? state : updateAnecdote
            );
        }
        default:
            return state;
    }
    
};

const generateId = () => Number((Math.random() * 10000).toFixed(0));

export const createAnecdote = (content) => {
    return {
        type: "NEW_ANECDOTE",
        payload: {
            content,
            votes: 0,
            id: generateId(),
        },
    };
};

export const updateAnecdote = (id) => {
    return {
        type: "UPDATE_ANECDOTE",
        payload: { id },
    };
};

export default reducer;
