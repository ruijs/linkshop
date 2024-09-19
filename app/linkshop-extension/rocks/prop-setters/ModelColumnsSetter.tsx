import { renderSingleControlPropSetter } from "@ruiapp/designer-extension";
import type { RockSinglePropSetterBase, PropSetterRockConfigBase, Rock } from "@ruiapp/move-style";

export interface ModelColumnsSetterProps extends RockSinglePropSetterBase<"storeEntityPropSetter">, PropSetterRockConfigBase {}

export default {
  $type: "modelColumnsSetter",

  Renderer(context, props: ModelColumnsSetterProps) {
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "modelColumnsSetterSelect",
      },
    });
  },
} as Rock;
