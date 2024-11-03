import { create } from "zustand";

type UsePathName = {
    pathName: string,
    setPathName: (pathName: string) => void
}

export const usePathName = create<UsePathName>((set) => ({
    pathName: window.location.pathname,
    setPathName: (path) => set(() => ({
        pathName: path
    }))
}))
