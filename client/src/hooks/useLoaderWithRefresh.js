import { useState, useEffect } from "react";
import { refresh } from "../apiCalls/refresh";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";

export function useLoaderWithRefresh() {
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await refresh();
                dispatch(setAuth(data));
                setLoader(false);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    return { loader };
}