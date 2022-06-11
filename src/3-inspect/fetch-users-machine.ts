import { createMachine, assign } from 'xstate';
import { faker } from '@faker-js/faker';

type UsersMachineContext = {
  users: Array<User>;
  fetchUsersError?: Error;
};

const initialContext: UsersMachineContext = {
  users: [],
};

type UsersMachineEvent =
  | { type: 'FETCH_USERS' }
  | { type: 'RETRY_FETCH_USERS' }
  | { type: 'START_OVER' };

export const fetchUsersMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAqrMATrALICG2AlgHZgB0qmW1UAxBAPY23UBu7A1nQbY8heEhAAHdrApoKnRKAAeiALQBGAEy0AbAGYDAFgCcABhMBWI5d1GAHBoA0IAJ7qtRgOx6N+rVom9ka6Fl4AvuEuwrj4RGSUXDHMLIQE7AS0kgA2pGjIGQC29OgiceKg0rLyihKqCGpalrT2+iYOAX5eJrqWLu4NGha0Zp7WISb6fhrakdGlsWIJTFxpGSwASgCiACobAJoA+gBiuwDCABKHOADKWxs3SlIycgpUT-WNuiNauiYmXiMGi8Wn0-jB-XUGksJloQyaCOCIOCRjmIBioni5BWdAoEGyYBYpx2l2udweTyqr1qKnU+jMZhaQKsBksMJMGmCkIav1h-zMRn0XjsU1BGjRGPKy2ohJuOwAghsdocAPIANXulJeNXedShUxGjgmXgF9nsPX03LUhkZZnsf109jtIUCZl0kSiICo7AgcCekqW2JlJUYzC11TeH3URlGejMXksXkBbT+TStGg5cNGpl0ug0RhCfndnoDWMSdFgAFcMBg4BVnhGaSB6gFGeZRj0GZZQQW+m4PKE4X5PC6bPZuxKFpiSEHVgR0gRw9TdbSEAEdL0-D1AcFJl500DaBzdFo7d2tMnLJPGNPpVw8QSlzqozzM3nLG1LJzQmzhVbDN8lj2gCp47qeJjXmUgblk+kZ6g0Ri-HGCZJoKPQmGm-YIV+tBAX8Jrmk0QLBB64RAA */
  createMachine(
    {
      context: initialContext,
      tsTypes: {} as import('./fetch-users-machine.typegen').Typegen0,
      schema: {
        context: {} as UsersMachineContext,
        events: {} as UsersMachineEvent,
        services: {} as { getAllUsersService: { data: Array<User> } },
      },
      on: {
        START_OVER: {
          target: '.idle',
        },
      },
      id: 'fetchUsersMachine',
      initial: 'idle',
      states: {
        fetching: {
          invoke: {
            src: 'getAllUsersService',
            id: 'fetchUsers',
            onDone: [
              {
                actions: 'assignUsers',
                target: 'success',
              },
            ],
            onError: [
              {
                actions: 'assignFetchUsersError',
                target: 'error',
              },
            ],
          },
        },
        success: {
          exit: 'clearUsers',
        },
        error: {
          exit: 'clearFetchUsersError',
          on: {
            RETRY_FETCH_USERS: {
              target: 'fetching',
            },
          },
        },
        idle: {
          on: {
            FETCH_USERS: {
              target: 'fetching',
            },
          },
        },
      },
    },
    {
      actions: {
        assignUsers: assign({
          users: (_, event) => event.data,
        }),
        clearUsers: assign({
          users: (_) => [],
        }),
        assignFetchUsersError: assign({
          fetchUsersError: (_, event) => event.data as Error,
        }),
        clearFetchUsersError: assign({
          fetchUsersError: (_) => undefined,
        }),
      },
      services: {
        getAllUsersService: async () => fetchUsers(),
      },
    },
  );

async function fetchUsers() {
  const shouldError = Math.random() > 0.5;

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  if (shouldError) {
    throw new Error('Oh noes!');
  }

  return users;
}

const users = Array.from({ length: 10 }).map<User>(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
