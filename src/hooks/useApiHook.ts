import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_COLLECTION, FIREBASE_DOCUMENT } from '@/services';
import { db } from '@/services/firebaseConfig';
import { ApiError, ErrorMessages } from './hooks.types';

const useApiHook = <T>() => {
  //T is used to specify the type of the state that will be stored and returned
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, FIREBASE_COLLECTION, FIREBASE_DOCUMENT);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const firebaseData = docSnap.data() as T;
          setData(firebaseData);
        } else {
          console.log('No such document!');
          setError({
            code: 404,
            message: ErrorMessages.NOT_FOUND,
            description: 'The requested data does not exist in the database.',
          });
          return;
        }
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching items:', err);
        setError({
          code: 500,
          message: ErrorMessages.INTERNAL_SERVER_ERROR,
          description: 'Failed to load items. Please try again.',
        });
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    fetchItems();
  }, []);

  return { data, loading, error };
};

export default useApiHook;
