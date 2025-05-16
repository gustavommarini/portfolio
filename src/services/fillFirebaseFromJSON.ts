import { doc, setDoc } from 'firebase/firestore';
import { ProfileData } from '@/models';
import { db } from './firebaseConfig';
import {
  skills,
  contactConfig,
  socialprofiles,
  educationInfo,
  jobInfo,
} from './data_content';
import { FIREBASE_COLLECTION, FIREBASE_DOCUMENT } from './constants';

const profileData: ProfileData = {
  skills,
  contactConfig,
  socialProfiles: socialprofiles,
  educationInfo,
  jobInfo,
};

async function saveProfileData(data: ProfileData): Promise<void> {
  try {
    await setDoc(doc(db, FIREBASE_COLLECTION, FIREBASE_DOCUMENT), data);
    console.log('Profile data successfully written for user:', 'data');
  } catch (error) {
    console.error('Error writing profile data:', error);
    throw error;
  }
}

// Function to initialize the database with profile data
export async function initializeProfileData(): Promise<void> {
  try {
    await saveProfileData(profileData);
    console.log('Profile data initialized successfully');
  } catch (error) {
    console.error('Failed to initialize profile data:', error);
    throw error;
  }
}
