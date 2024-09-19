import { RockEventHandlerConfig } from "@ruiapp/move-style";
import { RapidTableColumnConfig } from "@ruiapp/rapid-extension";
import type { LinkshopWidgetRockConfig } from "~/linkshop-extension/mod";

export interface sfSelectEntityConfig extends LinkshopWidgetRockConfig {
  icon: string;

  color: string;

  size?: number;

  list: { id: number; value: string; label: string };

  onChange?: RockEventHandlerConfig;

  value: string;

  selectionMode: "single" | "multiple";

  singularCode: string;

  columns: {
    selectedCode: RapidTableColumnConfig[];
  };

  orders: {
    orderBy: { code: string; sort: "asc" | "desc" }[];
  };

  pageSize: number;

  modalWidth: number;
}
