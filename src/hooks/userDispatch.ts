import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootStater, AppDispatcher } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatcher>();
export const useAppSelector: TypedUseSelectorHook<RootStater> = useSelector;