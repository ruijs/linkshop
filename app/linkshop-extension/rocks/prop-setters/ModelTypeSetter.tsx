import { renderSingleControlPropSetter } from "@ruiapp/designer-extension";
import type { RockSinglePropSetterBase, PropSetterRockConfigBase, Rock } from "@ruiapp/move-style";

export interface ModelTypeSetterProps extends RockSinglePropSetterBase<"storeEntityPropSetter">, PropSetterRockConfigBase {}

export default {
  $type: "modelTypeSetter",

  Renderer(context, props: ModelTypeSetterProps) {
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "modelTypeSetterSelect",
      },
    });
  },
} as Rock;
