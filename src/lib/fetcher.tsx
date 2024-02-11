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
