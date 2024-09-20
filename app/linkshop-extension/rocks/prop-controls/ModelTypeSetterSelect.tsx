import { Rock, RockConfigBase, RockEventHandler, handleComponentEvent } from "@ruiapp/move-style";
import { rapidAppDefinition } from "@ruiapp/rapid-extension";
import { renderRock } from "@ruiapp/react-renderer";

export interface ModelTypeSetterSelectProps extends RockConfigBase {
  $id: string;
  value?: {
    singularCode: string;
    columnsCodes: string[];
  };
  onChange?: RockEventHandler;
}

export type ModelTypeStyle = {
  id: number;
  name: string;
  namespace: string;
  pluralCode: string;
  singularCode: string;
  description?: string;
};

export default {
  $type: "modelTypeSetterSelect",

  Renderer(context, props: ModelTypeSetterSelectProps) {
    const { page, framework, scope } = context;
    const { onChange, value } = props;

    const entities = rapidAppDefinition.getEntities();

    const onEntityChange = (singularCode: string) => {
      handleComponentEvent("onChange", framework, page, scope, props, onChange!, [singularCode]);
    };

    return renderRock({
      context,
      rockConfig: {
        $type: "antdSelect",
        $id: `model-type-selector`,
        style: { width: "100%" },
        showSearch: true,
        filterOption: (input: string, option: { label: string; value: string }) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
        options: (entities || []).map((s) => ({ label: s.name, value: s.singularCode })),
        value: value,
        onChange: onEntityChange,
      },
    });
  },
} as Rock;
