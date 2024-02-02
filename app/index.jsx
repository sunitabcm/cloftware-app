import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import LoadingAnimation from "../component/GlobalComps/loadingAnimation";
import { getStudentProfile } from "../ApiCalls";
const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const fetchData = async () => {
    try {
      const response = await getStudentProfile(dispatch, response.body)
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    } catch (error) {
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authToken && userCred && Object.keys(userCred).length > 0) {
        router.replace("/dashboard");
      } else {
        if (authToken && Object.keys(userCred).length === 0) {
          fetchData(authToken)
        } else {
          router.replace("/slideshow");
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [router, authToken, userCred]);

  return (
    <LoadingAnimation />
  );
};

export default Index;
