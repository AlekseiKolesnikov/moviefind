import { create } from "zustand";

type PathNameState = {
    pathName: string,
    setPathName: (pathName: string) => void
}

export const usePathNameState = create<PathNameState>((set) => ({
    pathName: window.location.pathname,
    setPathName: (path) => set(() => ({
        pathName: path
    }))
}))
