import { firestore } from '../firebaseConfig';

describe('Firestore Emulator', () => {
  it('should retrieve data from Firestore', async () => {
    const docRef = firestore.collection('testCollection').doc('testDoc');
    await docRef.set({ name: 'Test' });
    const doc = await docRef.get();
    expect(doc.data()).toEqual({ name: 'Test' });
  });
});
