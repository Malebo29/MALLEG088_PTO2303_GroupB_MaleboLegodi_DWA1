/**
 * @typedef {'high' | 'medium' | 'low'} Urgency - The priority that the tasks
 * should take in terms of how quickly it should be completed
 *
 * @typedef {'recent' | 'oldest' | 'upcoming'} Sorting - One of three possible
 * predefined ordering approaches that task can be shown in. `recent` arranges
 * based on the tasks that were created closest to the current date, `oldest`
 * does the opposite, and `upcoming` arranges based on the closest due date (if
 * no due date it will be placed last).
 */

/**
 * @typedef {object} Task - An object representing a task to be shown to a user
 * @prop {string} id - A unique value generated by {@link createId} used to identify a task.
 * @prop {string} title - A short user-provided description of what the task entails
 * @prop {boolean} completed - Whether the task has been completed or not
 * @prop {Date} created - The exact date when the task was created in the system
 * @prop {null | Date} due - A user specified date for when the task should be completed
 * @prop {Urgency} urgency - A user specified indication of how important the task
 */

/**
 * @typedef {object} Filters - User configured filter values that control what tasks are shown.
 * @prop {string} search - A freeform string of characters that is matched against a task title.
 * @prop {Urgency | 'any'} urgency - Only shows tasks matching the value. `any` shows all tasks.
 * @prop {Sorting} sorting - Determines the order in which tasks are displayed.
 */

/**
 * @typedef {object} State - All data associated with the specific instance of the app
 * @prop {Record<string, Task>} tasks - A list of all tasks that have been created
 * @prop {Array<string>} displaying - `id` values of tasks that should be shown.
 * @prop {Filters} filters - An object containing the current filter state of tasks.
 */

/**
 * @type {State}
 */

export const state = {
  tasks: {},
  displaying: [],

  filters: {
    search: "",
    sorting: "recent",
    urgency: "any",
  },
};
