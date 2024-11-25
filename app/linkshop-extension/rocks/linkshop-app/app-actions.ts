import { Rock } from "@ruiapp/move-style";

const appActionMap: Record<string, Rock["onReceiveMessage"]> = {
  gotoNextStep: (message, state, props) => {
    state.switchStep("next");
  },
  gotoPreviousStep: (message, state, props) => {
    state.switchStep("prev");
  },
  gotoStepById: (message, state, props) => {
    state.switchStepById(message.payload.$id);
  },
  gotoStepByName: (message, state, props) => {
    state.switchStepByName(message.payload.$name);
  },
  enterStep: (message, state, props) => {
    state.enterStep(message.payload);
  },
  leaveStep: (message, state, props) => {
    state.leaveStep(message.payload);
  },
};

export default appActionMap;
