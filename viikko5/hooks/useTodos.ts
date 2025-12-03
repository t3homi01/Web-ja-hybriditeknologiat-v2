import { useReducer } from 'react';

type Task = {
  id: string;
  text: string;
};

type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'REMOVE'; payload: string };

const todosReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

export default function useTodos() {
  const [tasks, dispatch] = useReducer(todosReducer, []);

  const addTask = (text: string) => {
    dispatch({ type: 'ADD', payload: text });
  };

  const removeTask = (id: string) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  return { tasks, addTask, removeTask };
}
