type MenuType = "home" | "search" | "archive" | "tags" | "settings";

export const getSelectedOptionFromPath = (
  pathname: string
): Record<MenuType, boolean> => {
  const options: Record<MenuType, boolean> = {
    home: false,
    search: false,
    archive: false,
    tags: false,
    settings: false,
  };

  if (pathname === "/") options.home = true;
  else if (pathname === "/archived-notes") options.archive = true;
  else if (pathname === "/search") options.search = true;
  else if (pathname.startsWith("/tags")) options.tags = true;
  else if (pathname === "/settings") options.settings = true;

  return options;
};
