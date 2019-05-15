// @flow
import type { ChopStateType } from '../chop/dux';

const TOGGLE_NAV_MENU_EXPANDED = 'TOGGLE_NAV_MENU_EXPANDED';

type ToggleNavMenuExpandedType = {
  type: typeof TOGGLE_NAV_MENU_EXPANDED,
};

const toggleNavMenuExpanded = (): ToggleNavMenuExpandedType => (
  {
    type: TOGGLE_NAV_MENU_EXPANDED,
  }
);

const isNavMenuExpanded = (state:ChopStateType) => state.feed.nav.expanded;

export {
  toggleNavMenuExpanded,
  isNavMenuExpanded,
  TOGGLE_NAV_MENU_EXPANDED,
};

export type {
  ToggleNavMenuExpandedType,
};