// authStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
// import * as SecureStore from 'expo-secure-store';

export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const loadAuthToken = async (deleteToken = false) => {
  try {
    const storedTokenString = await AsyncStorage.getItem('authToken');
    
    if (deleteToken) {
      await deleteAuthToken();
      return null;
    }
    
    const storedToken = storedTokenString ? JSON.parse(storedTokenString) : null;

    return storedToken;
  } catch (error) {
    console.error('Error loading auth token:', error);
    return null;
  }
};

export const deleteAuthToken = async () => {
  try {
    // await SecureStore.deleteItemAsync('authToken');
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error deleting auth token:', error);
  }
};

export const checkAndReinstateAuthToken = async () => {
  try {
    const appState = await AppState.currentState;

    if (appState === 'active') {
      const storedToken = await loadAuthToken();
      if (storedToken) {
        await saveAuthToken(storedToken);
      }
    }
  } catch (error) {
    console.error('Error checking and reinstating auth token:', error);
  }
};

// Listen for changes in app state
AppState.addEventListener('change', checkAndReinstateAuthToken);
