export function loadState<T>(key: string): T | undefined {
    try{
        const serializedState = localStorage.getItem(key);
        if(!serializedState){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        console.error(err);
        return undefined;
    }
}

export function saveState<T>(state: T, key: string){
    const serializedString = JSON.stringify(state);
    localStorage.setItem(key, serializedString);
}