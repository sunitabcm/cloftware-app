// authStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

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
    
    const storedToken = storedTokenString;

    return storedToken;
  } catch (error) {
    console.error('Error loading auth token:', error);
    return null;
  }
};

export const deleteAuthToken = async () => {
  try {
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


export const saveAuthUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('authUserData', userData);
    
  } catch (error) {
    console.error('Error saving auth UserData:', error);
  }
};

export const loadAuthUserData = async (deleteUserData = false) => {
  try {
    const storedUserDataString = await AsyncStorage.getItem('authUserData');
    
    if (deleteUserData) {
      await deleteAuthUserData();
      return null;
    }
    
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : null;

    return storedUserData;
  } catch (error) {
    console.error('Error loading auth UserData:', error);
    return null;
  }
};

export const deleteAuthUserData = async () => {
  try {
    await AsyncStorage.removeItem('authUserData');
  } catch (error) {
    console.error('Error deleting auth UserData:', error);
  }
};

export const checkAndReinstateAuthUserData = async () => {
  try {
    const appState = await AppState.currentState;

    if (appState === 'active') {
      const storedUserData = await loadAuthUserData();
      if (storedUserData) {
        await saveAuthUserData(storedUserData);
      }
    }
  } catch (error) {
    console.error('Error checking and reinstating auth UserData:', error);
  }
};

// Listen for changes in app state
AppState.addEventListener('change', checkAndReinstateAuthUserData);

export const saveAuthTeacherData = async (userData) => {
  try {
    await AsyncStorage.setItem('authTeacherData', userData);
    
  } catch (error) {
    console.error('Error saving auth UserData:', error);
  }
};

export const loadAuthTeacherData = async (deleteUserData = false) => {
  try {
    const storedUserDataString = await AsyncStorage.getItem('authTeacherData');
    
    if (deleteUserData) {
      await deleteAuthTeacherData();
      return null;
    }
    
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : null;

    return storedUserData;
  } catch (error) {
    console.error('Error loading auth UserData:', error);
    return null;
  }
};

export const deleteAuthTeacherData = async () => {
  try {
    await AsyncStorage.removeItem('authTeacherData');
  } catch (error) {
    console.error('Error deleting auth UserData:', error);
  }
};

export const checkAndReinstateAuthTeacherData = async () => {
  try {
    const appState = await AppState.currentState;

    if (appState === 'active') {
      const storedUserData = await loadAuthTeacherData();
      if (storedUserData) {
        await saveAuthTeacherData(storedUserData);
      }
    }
  } catch (error) {
    console.error('Error checking and reinstating auth UserData:', error);
  }
};

// Listen for changes in app state
AppState.addEventListener('change', checkAndReinstateAuthTeacherData);


// Android package name -  com.cloftware.erp
// Web API key - AIzaSyActasyEY75gJMBtqSgORSR4NKIo1X42fY
// App ID - 1:418175820894:android:e5992086c93aaf959e00cf
// Sender ID - 418175820894
// Project Id - cloftware-technology
// Project name - Cloftware Technology