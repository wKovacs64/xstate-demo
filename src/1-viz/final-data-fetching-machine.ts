import { createMachine } from 'xstate';

export const dataFetchingMachine = createMachine({
  id: 'fetchingData',
  tsTypes: {} as import('./final-data-fetching-machine.typegen').Typegen0,
  initial: 'fetching',
  states: {
    fetching: {
      invoke: {
        id: 'fetchData',
        src: 'fetchDataService',
        onDone: 'success',
        onError: 'error',
      },
    },
    success: {
      type: 'final',
    },
    error: {},
  },
});
