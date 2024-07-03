import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';

interface TasksForDay {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  idDay: string;
  tasksForDay: TasksForDay[];
}

interface TasksState {
  tasks: Task[];
  addTask: (text: string, idDay: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  tasks: [],

  addTask: (text: string, idDay: string) => {
    set(
      produce((state) => {
        const existingDayIndex = state.tasks.findIndex(
          (task: Task) => task.idDay === idDay,
        );

        if (existingDayIndex !== -1) {
          state.tasks[existingDayIndex].tasksForDay.push({
            id: uuid(),
            text,
            completed: false,
          });
        } else {
          state.tasks.push({
            idDay,
            tasksForDay: [
              {
                id: uuid(),
                text,
                completed: false,
              },
            ],
          });
        }
      }),
    );
  },

  deleteTask: (id: string) => {
    set(
      produce((state) => {
        state.tasks.forEach((day: Task) => {
          day.tasksForDay = day.tasksForDay.filter(
            (task: TasksForDay) => task.id !== id,
          );
        });
      }),
    );
  },

  toggleTaskCompletion: (id: string) => {
    set(
      produce((state) => {
        state.tasks.forEach((day: Task) => {
          day.tasksForDay.forEach((task) => {
            if (task.id === id) {
              task.completed = !task.completed;
            }
          });
        });
      }),
    );
  },
}));

export default useTasksStore;
