import { useMachine } from '@xstate/react';
import React from 'react';
import { fetchUsersMachine } from './3-inspect/fetch-users-machine';

export default function App() {
  const [state, send] = useMachine(fetchUsersMachine, { devTools: true });
  const { users, fetchUsersError } = state.context;

  return (
    <section className="h-full">
      <div className="grid h-full grid-cols-2 items-center">
        <div className="grid h-full grid-cols-1 place-items-center border-r-2 border-r-indigo-900">
          <p className="text-3xl">
            <span className="mr-3">State:</span>
            <span>{String(state.value)}</span>
          </p>
          <div className="flex gap-6">
            {state.matches('idle') && (
              <Button onClick={() => send('FETCH_USERS')}>Fetch Users</Button>
            )}
            {state.matches('fetching') && <Button disabled>Fetching...</Button>}
            {state.matches('error') && (
              <Button onClick={() => send('RETRY_FETCH_USERS')}>
                Try Again
              </Button>
            )}
            {!state.matches('idle') && (
              <Button onClick={() => send('START_OVER')}>Start Over</Button>
            )}
          </div>
        </div>
        <div className="grid h-full grid-cols-1 place-items-center border-l-2 border-l-indigo-900">
          <p>
            {state.matches('idle') && (
              <span className="text-3xl text-indigo-600">
                Nothing going on right now.
              </span>
            )}
            {state.matches('fetching') && (
              <span className="text-3xl text-indigo-600">
                Cross your fingers...
              </span>
            )}
            {state.matches('error') && fetchUsersError && (
              <span className="text-3xl text-red-600">
                Error: {fetchUsersError.message}
              </span>
            )}
            {state.matches('success') && users && (
              <div className="grid grid-cols-1 gap-y-4">
                <p className="text-3xl font-bold">Users:</p>
                <ul className="list-inside list-disc">
                  {users.map((user) => (
                    <li key={user.id} className="font-mono">
                      {user.name} &lt;
                      <span className="border-b border-dashed border-indigo-500 hover:cursor-pointer">
                        {user.email}
                      </span>
                      &gt;
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="rounded bg-indigo-600 py-3 px-7 text-3xl font-bold text-white shadow-xl hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      {...props}
    />
  );
}
