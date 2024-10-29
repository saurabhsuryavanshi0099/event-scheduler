import { openDB } from 'idb';

const DATABASE_NAME = 'eventSchedulerDB';
const STORE_NAME = 'events';

export const initDB = async () => {
  return openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveEvent = async (event) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
  
    if (!event.id) {
      delete event.id;
    }
  
    const id = await store.put(event);
    await tx.done;
  
    return id;
  };
export const getEvents = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteEvent = async (id) => {
  if (typeof id === 'undefined' || id === null) {
    console.error('Event ID is undefined or null:', id);
    throw new Error('Invalid ID passed to deleteEvent');
  }

  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  await store.delete(id);
  await tx.done;
};
