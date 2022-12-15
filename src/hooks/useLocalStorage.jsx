import { useEffect, useState } from "react";

export function useLocalStorage(localStorageItem, initialValue) {

    const [data, setData] = useState(initialValue)

    useEffect(() => {

        localStorage.setItem(localStorageItem, data)

    }, [data, localStorageItem])

    return [data, setData]

}