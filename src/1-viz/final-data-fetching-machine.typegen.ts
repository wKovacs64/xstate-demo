// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {};
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
    'done.invoke.fetchData': {
      type: 'done.invoke.fetchData';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetchData': {
      type: 'error.platform.fetchData';
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    fetchDataService: 'done.invoke.fetchData';
  };
  missingImplementations: {
    actions: never;
    services: 'fetchDataService';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchDataService: 'xstate.init';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'fetching' | 'success' | 'error';
  tags: never;
}
