// @flow
import type { FeedType } from '../feed/dux';

const TOGGLE_NAV_MENU_EXPANDED = 'TOGGLE_NAV_MENU_EXPANDED';

type ToggleNavMenuExpandedType = {
  type: typeof TOGGLE_NAV_MENU_EXPANDED,
};

const toggleNavMenuExpanded = (): ToggleNavMenuExpandedType => (
  {
    type: TOGGLE_NAV_MENU_EXPANDED,
  }
);

const isNavMenuExpanded = (state:FeedType) => state.nav.expanded;

export {
  toggleNavMenuExpanded,
  isNavMenuExpanded,
  TOGGLE_NAV_MENU_EXPANDED,
};

export type {
  ToggleNavMenuExpandedType,
};