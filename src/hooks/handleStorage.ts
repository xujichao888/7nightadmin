


export function handleStorage() {

    const getStorage = (id: string): string | null => {
        let result: string | null = localStorage.getItem(id)
        return result == null ? null : JSON.parse(result as string)
    }
    const setStorage = (id: string, value: any): void => {
        localStorage.setItem(id, JSON.stringify(value))
    }
    const removeStoage = (id: string): void => {
        localStorage.removeItem(id)
    }
    return {
        getStorage,
        setStorage,
        removeStoage
    }
}
