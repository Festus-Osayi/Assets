import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearchHistoryState, useFavouriteListState } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];
function RouteGuard(props) {
  const router = useRouter();
  const [favouriteLists, setFavouritesLists] = useFavouriteListState();
  const [searchHistory, setSearchHistory] = useSearchHistoryState();
  const [authorized, setAuthorized] = useState(false);

  /** updates both the favourite and artwork lists */
  const updateAtoms = async () => {
    setFavouritesLists(await getFavourites());
    setSearchHistory(await getHistory());
  };

  useEffect(() => {
    updateAtoms();
  }, []);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  /** a function called "authCheck" that checks the requested route
   * and compares it against the "public" routes.
   */
  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}

export default RouteGuard;
