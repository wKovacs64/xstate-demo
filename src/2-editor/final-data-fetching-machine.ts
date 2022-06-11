import { createMachine } from 'xstate';

export const dataFetchingMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAlgOygBEBDNYgOlU1wIGIIB7PMc-ANwYGsWrsSzEoAA4NYONDiaCQAD0QAWAJwBGcgFZFagOyblmrQAYAzABoQAT0QBaZQfIA2ZXsVKjAJh3Kj8gL4+zvDREpBSB+FC0YABOUQxR5EIANqTIcQC2lOh8IdIiYhJSSLIKWlrkLlpG9mpGBjpq9vJmlghedkaaBvLyygAcbu4Dan4BWUH8FNGxUbQASgCiACqzAJoA+gBiSwDCABJrhACCi4e5ouKSeNJyCPK9dm4avdXdDfIGA82IOuS2Wr2VLTyTyKey9Pz+EB4BgQODSMIECaZajhM75S7XRBOMred5qAwGNQDeQaNRfW5lP69JS9IzaPpuNwjEAI4JkciwACuGAwcHgRTyF0KoBuWlsDmU9lq8jcyh0ihc5Lc5CMAMUaq6ii6VSMWmZrKRUziaKFVyKouUyvsCrcXWqQLlbnJzwcHgVXj6DWeRn1Y3CExNBTNIsQiiMKu6hIJRO8pPJVlpEr01IM9zUz2pEJ8QA */
  createMachine({
    tsTypes: {} as import('./final-data-fetching-machine.typegen').Typegen0,
    id: 'fetchingData',
    initial: 'fetching',
    states: {
      fetching: {
        invoke: {
          src: 'fetchDataService',
          id: 'fetchData',
          onDone: [
            {
              actions: 'assignData',
              target: 'success',
            },
          ],
          onError: [
            {
              actions: 'assignFetchDataError',
              target: 'error',
            },
          ],
        },
      },
      success: {
        type: 'final',
      },
      error: {
        exit: 'clearFetchDataError',
        on: {
          RETRY_FETCH_DATA: {
            target: 'fetching',
          },
        },
      },
    },
  });
