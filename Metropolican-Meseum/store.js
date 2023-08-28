import { atom } from "jotai";
import { useAtom } from "jotai";

/**
 * Using Jotai to create a "favouritesAtom" with the default value of []
 * also control the state of add a favourite artwork
 * useFavouriteListState, a custom hook
 */

export const favouritesAtom = atom()
export const useFavouriteListState = () => useAtom(favouritesAtom)

/**
 * Search History" mechanism to allow users to keep track of
 * previous searches and re-run / delete them if they wish.
 * useSearchHistoryState, a custom hook
 */
export const searchHistoryAtom = atom()
export const useSearchHistoryState = ()=> useAtom(searchHistoryAtom)

