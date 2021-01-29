export const StorageService = {
    setItem: (key: string, item: any) =>
        new Promise<void>((resolve, reject) => {
            try {
                window.localStorage.setItem(key, JSON.stringify(item));
                resolve();
            } catch (error) {
                reject();
            }
        }),
    getItem: (key: string) =>
        new Promise<any>((resolve, reject) => {
            try {
                const value = window.localStorage.getItem(key);
                if (value !== null) {
                    resolve(JSON.parse(value));
                }
            } catch (error) {
                reject();
            }
        }),
    removeItem: (key: string) =>
        new Promise<void>((resolve, reject) => {
            try {
                window.localStorage.removeItem(key);
                resolve();
            } catch (error) {
                reject();
            }
        }),
};
