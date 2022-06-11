// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignData: 'done.invoke.fetchData';
    assignFetchDataError: 'error.platform.fetchData';
    clearFetchDataError: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.fetchData': {
      type: 'done.invoke.fetchData';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetchData': {
      type: 'error.platform.fetchData';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    fetchDataService: 'done.invoke.fetchData';
  };
  missingImplementations: {
    actions: 'assignData' | 'assignFetchDataError' | 'clearFetchDataError';
    services: 'fetchDataService';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchDataService: 'RETRY_FETCH_DATA';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'fetching' | 'success' | 'error';
  tags: never;
}
