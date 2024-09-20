import React from "react";
import DocsVersionDropdownNavbarItem from "@theme-original/NavbarItem/DocsVersionDropdownNavbarItem";
import type DocsVersionDropdownNavbarItemType from "@theme/NavbarItem/DocsVersionDropdownNavbarItem";
import type { WrapperProps } from "@docusaurus/types";

import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";

// The component have been swizzled to show just a single relevant docs version switcher at a time.
// See: https://github.com/facebook/docusaurus/issues/3930
// Also: https://github.com/facebook/docusaurus/issues/4389

type Props = WrapperProps<typeof DocsVersionDropdownNavbarItemType>;

export default function DocsVersionDropdownNavbarItemWrapper(props: Props): JSX.Element {
  // do not display this navbar item if current page is not a doc
  const activeDocContext = useActiveDocContext(props.docsPluginId);
  if (!activeDocContext.activeDoc) {
    return null;
  }

  return (
    <>
      <DocsVersionDropdownNavbarItem {...props} />
    </>
  );
}
