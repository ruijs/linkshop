import type { Rock, RockConfig } from "@ruiapp/move-style";
import { handleComponentEvent } from '@ruiapp/move-style'
import ShopfloorAppMeta from "./LinkshopAppMeta";
import { renderRock } from "@ruiapp/react-renderer";
import type { LinkshopAppLayoutRockConfig, LinkshopAppRockConfig, LinkshopAppStepRockConfig } from "~/linkshop-extension/linkshop-types";

import appActionMap from "./app-actions";
import { useEffect, useState } from "react";
import { find, isArray, isEmpty } from "lodash";

let timer: NodeJS.Timeout | undefined

export default {
  onResolveState(props, state) {
    const { steps, _context } = props;
    const { page, framework, scope } = _context

    const [currentStep, setCurrentStep] = useState<LinkshopAppStepRockConfig>(steps?.[0]);
    useEffect(() => {
      if (!currentStep && !isEmpty(steps)) {
        setCurrentStep(steps[0]);
      }
    }, [steps]);

    return {
      currentStep,
      switchStep: (key: "next" | "prev") => {
        const currentStepIndex = steps.findIndex((s: any) => s.$id === currentStep.$id);
        switch (key) {
          case "next":
            const nextStep = steps[currentStepIndex + 1];
            if (nextStep) {
              setCurrentStep(nextStep);
            }
            break;
          case "prev":
            const prevStep = steps[currentStepIndex - 1];
            if (prevStep) {
              setCurrentStep(prevStep);
            }
            break;
        }
      },
      switchStepById: (id: string) => {
        const targetStepIndex = steps.findIndex((s: any) => s.$id === id);
        if (targetStepIndex === -1) {
          return;
        }
        setCurrentStep(steps[targetStepIndex]);
      },
      switchStepByName: (name: string) => {
        const targetStepIndex = steps.findIndex((s: any) => s.$name === name);
        if (targetStepIndex === -1) {
          return;
        }
        setCurrentStep(steps[targetStepIndex]);
      },
      enterStep: (step: LinkshopAppStepRockConfig) => {
        if(step.onEnterStep) {
          handleComponentEvent("script", framework, page, scope, step, step.onEnterStep, [step])
        }
        if(step.onInterval) {
          if(!timer) {
            timer = setInterval(() => {
              handleComponentEvent("script", framework, page, scope, step, step.onInterval, [step])
            }, step.intervalTime * 1000 || 60000)
          }
        }
      },
      leaveStep: (step: LinkshopAppStepRockConfig) => {
        if(step.onLeaveStep) {
          handleComponentEvent("script", framework, page, scope, step, step.onLeaveStep, [step])
        }
        if(step.onInterval) {
          if (timer) {
            clearInterval(timer)
          }
        }
      },
    };
  },

  onReceiveMessage(message, state, props) {
    const appAction = appActionMap[message.name];
    if (typeof appAction === "function") {
      appAction(message, state, props);
    }
  },

  Renderer(context, props: LinkshopAppRockConfig, state) {
    const { $id } = props;
    const { currentStep } = state;

    let layoutOfCurrentStep: LinkshopAppLayoutRockConfig | undefined;
    layoutOfCurrentStep = find(props.layouts, { $id: currentStep.layoutId });

    let layoutChildren: RockConfig[];
    if (layoutOfCurrentStep && layoutOfCurrentStep.children) {
      if (isArray(layoutOfCurrentStep?.children)) {
        layoutChildren = layoutOfCurrentStep.children;
      } else {
        layoutChildren = [layoutOfCurrentStep.children];
      }
    } else {
      layoutChildren = [];
    }
    const backgroundColor = currentStep.backgroundColor || layoutOfCurrentStep?.backgroundColor;

    const rockConfig: RockConfig = {
      $id: `${$id}-internal`,
      $type: "component",
      component: {
        view: [
          {
            $id: `${$id}-bg`,
            $type: "box",
            style: {
              width: "100%",
              height: "100%",
              backgroundColor,
              transition: "background-color .3s cubic-bezier(.645, .045, .355, 1)",
            },
            children: [
              ...layoutChildren,
              {
                $id: `${$id}-children-slot`,
                $type: "slot",
              },
            ],
          },
        ],
      },
      children: currentStep.children,
    };

    useEffect(() => {
      props._context.page.sendComponentMessage("linkshopApp", { name: "enterStep", payload: currentStep });
      return () => {
        props._context.page.sendComponentMessage("linkshopApp", { name: "leaveStep", payload: currentStep });
      };
    }, [currentStep]);

    return renderRock({
      context,
      rockConfig,
    });
  },

  ...ShopfloorAppMeta,
} as Rock;
