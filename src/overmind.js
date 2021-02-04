import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook
} from "overmind-react";

export const config = {
  state: {
    user: {
      username: null
    }
  },
  actions: {
    login({ state }, username) {
      state.user.username = username;
    }
  }
};

export const useState = createStateHook();
export const useActions = createActionsHook();
export const useEffects = createEffectsHook();
export const useReaction = createReactionHook();
