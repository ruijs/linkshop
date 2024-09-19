import { Link, useParams } from "@remix-run/react";
import { Menu } from "antd";
import * as antdIcons from "@ant-design/icons";
import type { ItemType, MenuItemGroupType } from "antd/lib/menu/hooks/useItems";
import { useMemo } from "react";
import { arrayToTree } from "~/utils/array-utils";
import { uniq } from "lodash";
import pageModels from "~/_definitions/meta/page-models";

export interface AppNavItem {
  code: string;
  name: string;
  icon?: string;
  pageCode: string;
  state: string;
  orderNum: number;
  parent?: AppNavItem;
  children?: AppNavItem[];
}

function getMenuItemFromNavItem(navItem: AppNavItem, appCode?: string): ItemType {
  const IconComponent = navItem.icon ? (antdIcons as any)[navItem.icon] : null;
  const menuItem: ItemType = {
    key: navItem.code,
    icon: IconComponent ? <IconComponent /> : null,
    label: navItem.pageCode ? <Link to={`/${appCode || "pages"}/${navItem.pageCode}`}>{navItem.name}</Link> : <span>{navItem.name}</span>,
  };
  if (navItem.children && navItem.children.length) {
    (menuItem as MenuItemGroupType).children = navItem.children.map((navItem) => getMenuItemFromNavItem(navItem, appCode));
  }

  if (!navItem.pageCode && !(menuItem as MenuItemGroupType).children) {
    return null;
  }

  return menuItem;
}


function isValidNav(nav: AppNavItem) {
  return true

  // 导航配置应该所见即所得
  // 是否展示，不应以是否存在 page 模型为条件
  // if (!!nav.children?.length) {
  //   return true;
  // }
  // const page = nav.pageCode && pageModels.find((m) => m.code === nav.pageCode);
  // return !!page;
}

function getValidMenuItems(navTree: AppNavItem[]): AppNavItem[] {
  return (navTree || [])
    .map((nav) => {
      return {
        ...nav,
        children: getValidMenuItems(nav.children || []),
      };
    })
    .filter((item) => isValidNav(item));
}

function getMenuItems(navItems: AppNavItem[], appCode?: string) {
  const navItemsTree = arrayToTree(navItems, null, {
    parentField: "parent.id",
  });

  const validNavItems = getValidMenuItems(navItemsTree);
  const menuItems: ItemType[] = validNavItems.map((navItem) => getMenuItemFromNavItem(navItem, appCode));

  return menuItems;
}

export interface IProps {
  navItems: AppNavItem[];
  appCode?: string;
}

export default function LeftNav(props: IProps) {
  const { navItems, appCode } = props;

  const params = useParams();

  const selectedKeys = useMemo(() => {
    const currentPage: any = params.code && pageModels.find((m) => m.code === params.code);

    function getSelectedKeys(navItem?: AppNavItem): string[] {
      if (!navItem) {
        return [];
      }

      const parentNav = navItem.parent;
      if (parentNav) {
        return [navItem.code, ...getSelectedKeys(parentNav)];
      } else {
        return [navItem.code];
      }
    }

    const parentNavItem = currentPage?.parentCode && navItems.find((item) => item.pageCode === currentPage.parentCode);
    const currentNavItem = navItems.find((item) => item.pageCode === params.code);

    const parentKeys = getSelectedKeys(parentNavItem);
    const keys = getSelectedKeys(currentNavItem);

    return uniq([...parentKeys, ...keys]);
  }, [params.code, navItems]);

  const menuItems = useMemo(() => {
    return getMenuItems(navItems, appCode);
  }, [navItems]);

  return <Menu selectedKeys={selectedKeys} defaultOpenKeys={selectedKeys} className="rui-left-nav-menu" theme="dark" mode="inline"
               items={menuItems} />;
}
