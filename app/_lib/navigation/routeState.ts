export type AppRoute =
  | { kind: "home" }
  | { kind: "auth" }
  | { kind: "blog-list"; mode: "public" | "admin" }
  | { kind: "blog-post"; mode: "public" | "admin"; slug: string }
  | { kind: "other" };

type RouteMatcher = {
  match: (pathname: string) => RegExpMatchArray | null;
  resolve: (match: RegExpMatchArray) => AppRoute;
};

const routeMatchers: RouteMatcher[] = [
  {
    match: (pathname) => (pathname === "/" ? [pathname] : null),
    resolve: () => ({ kind: "home" }),
  },
  {
    match: (pathname) => (pathname.startsWith("/auth/") ? [pathname] : null),
    resolve: () => ({ kind: "auth" }),
  },
  {
    match: (pathname) => (pathname === "/blog" ? [pathname] : null),
    resolve: () => ({ kind: "blog-list", mode: "public" }),
  },
  {
    match: (pathname) => (pathname === "/blog/admin" ? [pathname] : null),
    resolve: () => ({ kind: "blog-list", mode: "admin" }),
  },
  {
    match: (pathname) => pathname.match(/^\/blog\/([^/]+)$/),
    resolve: (match) => ({ kind: "blog-post", mode: "public", slug: match[1] }),
  },
  {
    match: (pathname) => pathname.match(/^\/blog\/([^/]+)\/admin$/),
    resolve: (match) => ({ kind: "blog-post", mode: "admin", slug: match[1] }),
  },
];

export type ModeToggleState = {
  activeMode: "public" | "admin";
  options: [
    { href: string; label: string; active: boolean },
    { href: string; label: string; active: boolean },
  ];
};

export function getAppRoute(pathname: string): AppRoute {
  const route = routeMatchers
    .map((matcher) => {
      const match = matcher.match(pathname);

      return match ? matcher.resolve(match) : null;
    })
    .find(Boolean);

  return route ?? { kind: "other" };
}

export function getModeToggleState(
  pathname: string,
  isAuthenticated: boolean,
): ModeToggleState | null {
  if (!isAuthenticated) {
    return null;
  }

  const route = getAppRoute(pathname);

  if (route.kind === "blog-list") {
    return {
      activeMode: route.mode,
      options: [
        { href: "/blog", label: "Public", active: route.mode === "public" },
        {
          href: "/blog/admin",
          label: "Admin",
          active: route.mode === "admin",
        },
      ],
    };
  }

  if (route.kind === "blog-post") {
    return {
      activeMode: route.mode,
      options: [
        {
          href: `/blog/${route.slug}`,
          label: "Public",
          active: route.mode === "public",
        },
        {
          href: `/blog/${route.slug}/admin`,
          label: "Admin",
          active: route.mode === "admin",
        },
      ],
    };
  }

  return null;
}
