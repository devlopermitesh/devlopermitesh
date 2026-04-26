import { usePathname } from "next/navigation";

const routes = [
  { path: "/about", name: "About" },
  { path: "/skills", name: "Skills" },
  { path: "/project", name: "Projects" },
  { path: "/contact-me", name: "Contact Me" },
];

const useRoutes = () => {
  const pathname = usePathname();

  const routesWithActive = routes.map((route) => ({
    ...route,
    active: route.path === pathname,
  }));

  const activeRoute = routesWithActive.find((r) => r.active);

  return {
    routes: routesWithActive,
    activeRoute,
  };
};

export default useRoutes;
