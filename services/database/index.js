export const createDatabase = (databaseName, tableNames, keyPath = "id") => {
    return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(databaseName, 1);
        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            tableNames.forEach((tableName) => {
                if (!db.objectStoreNames.contains(tableName)) {
                    //TODO: get table specific keyPath
                    db.createObjectStore(tableName, { keyPath });

                    //TODO: create other indexes?
                }
            });
        };
        handleCallbacks(request, resolve, reject);
    });
};

export const deleteDatabase = (databaseName) => {
    return new Promise((resolve, reject) => {
        let request = window.indexedDB.deleteDatabase(databaseName);
        handleCallbacks(request, resolve, reject);
    });
};

export const getTable = (tableName, database, write = false) => {
    let transaction = database.transaction(tableName, write ? "readwrite" : "readonly");
    return transaction.objectStore(tableName);
};

export const clearTable = (tableName, database) => {
    return new Promise((resolve, reject) => {
        let table = getTable(tableName, database, true);
        let request = table.clear();
        handleCallbacks(request, resolve, reject);
    });
};

export const get = (key, tableName, database) => {
    return new Promise((resolve, reject) => {
        let table = getTable(tableName, database);
        let request = table.get(key);
        handleCallbacks(request, resolve, reject);
    });
};

export const getAll = (tableName, database) => {
    return new Promise((resolve, reject) => {
        let table = getTable(tableName, database);
        let request = table.getAll();
        handleCallbacks(request, resolve, reject);
    });
};

export const put = (entry, tableName, database) => {
    return new Promise((resolve, reject) => {
        let table = getTable(tableName, database, true);
        let request = table.put(entry);
        handleCallbacks(request, resolve, reject);
    });
};

export const putAll = (entries, tableName, database) => {
    let table = getTable(tableName, database, true);
    let requests = entries.map(
        (entry) =>
            new Promise((resolve, reject) => {
                let request = table.put(entry);
                handleCallbacks(request, resolve, reject);
            })
    );
    return Promise.all(requests);
};

const handleCallbacks = (request, resolve, reject) => {
    request.onsuccess = (event) => {
        let { result } = event.target;
        resolve(result);
    };
    request.onerror = (event) => {
        reject(event.target);
    };
};

class Database {
    constructor(databaseName, tableNames) {
        this.name = databaseName;
        this.db = createDatabase(databaseName, tableNames);
    }

    get(key, tableName) {
        return this.db.then((db) => get(key, tableName, db));
    }

    getAll(tableName) {
        return this.db.then((db) => getAll(tableName, db));
    }

    put(entry, tableName) {
        return this.db.then((db) => put(entry, tableName, db));
    }

    putAll(entries, tableName) {
        return this.db.then((db) => putAll(entries, tableName, db));
    }

    replaceAll(entries, tableName) {
        return this.clear(tableName).then(() => this.putAll(entries, tableName));
    }

    clear(tableName) {
        return this.db.then((db) => clearTable(tableName, db));
    }

    delete() {
        delete this.db;
        return deleteDatabase(this.name);
    }
}

export default Database;
