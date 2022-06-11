// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignUsers: 'done.invoke.fetchUsers';
    assignFetchUsersError: 'error.platform.fetchUsers';
    clearUsers: 'xstate.init';
    clearFetchUsersError: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.fetchUsers': {
      type: 'done.invoke.fetchUsers';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetchUsers': {
      type: 'error.platform.fetchUsers';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    getAllUsersService: 'done.invoke.fetchUsers';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getAllUsersService: 'RETRY_FETCH_USERS' | 'FETCH_USERS';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'fetching' | 'success' | 'error' | 'idle';
  tags: never;
}
