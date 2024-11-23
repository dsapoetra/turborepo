import { firestore } from '../firebaseConfig';
import { User } from 'shared/types/user';

// Fetch user data by ID
export const fetchUser = async (id: string): Promise<any | null> => {
  console.log(`Fetching Firestore document with ID: ${id}`); // Log the document ID
  try {
    const docRef = firestore.collection('USERS').doc(id);
    console.log(`Firestore document path: ${docRef.path}`); // Log the document path

    const doc = await docRef.get();
    console.log(`Document exists: ${doc.exists}`); // Log if the document exists
    console.log(`Fetched Firestore document data: ${JSON.stringify(doc.data())}`); // Log the document data

    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error('Error fetching document from Firestore:', error); // Log any errors
    throw error;
  }
};


// Update user data by ID
export const updateUser = async (id: string, userData: Partial<User>): Promise<void> => {
  console.log('Updating Firestore document with ID:', id, 'with data:', userData);
  await firestore.collection('USERS').doc(id).set(userData, { merge: true });
};
