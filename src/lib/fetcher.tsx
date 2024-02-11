import { DocumentReference, DocumentSnapshot, getDoc, Timestamp } from 'firebase/firestore';

type DataSnapshot<T> = T | null;

export const convertTimestamps = (obj: any) => {
  for (const key in obj) {
    if (obj[key] instanceof Timestamp) {
      obj[key] = obj[key].toDate().toISOString();
    }
  }
  return obj;
}

export async function getData<T>(docRef: DocumentReference<T>): Promise<DataSnapshot<T>> {
  try {
    const docSnap: DocumentSnapshot<T> = await getDoc(docRef);
    let filteredData = docSnap.data();

    if (filteredData) {
      filteredData = convertTimestamps(filteredData);
    }

    return filteredData ?? null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function fetcher<T = any>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);

  // If the server responds with a non-OK status, throw an error.
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  // If the server responds with a OK status, parse the JSON and return it.
  return res.json();
}

export default fetcher;