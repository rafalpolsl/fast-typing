const PUBLIC_ROUTES = {
  index: "/",
  login: "/login",
  register: "/register",
};

const AUTH_ROUTES = {
  home: "/home",
  typing: "/typing",
  settings: "/settings",
};

export const ROUTES = { ...PUBLIC_ROUTES, ...AUTH_ROUTES };
