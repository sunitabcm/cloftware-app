import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Buttons from "../component/Buttons";
import { useRouter } from "expo-router";
import BtnGlobal from "../component/GlobalComps/BtnGlobal";
import { Image } from "expo-image";
const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const data = [
    { id: 1, image: require("../assets/Isolation_Mode.png"), text: " Track Attendance, Real-Time Updates", descriptionText: 'Instant info on progress, assignments, and attendance.' },
    { id: 2, image: require("../assets/Frame.png"), text: "Direct Teacher Communication", descriptionText: 'Connect directly, ask questions, and collaborate with teachers.' },
    { id: 3, image: require("../assets/Group-23.png"), text: "Efficient School Management", descriptionText: 'Intuitive and efficient, tailors to manage your role seamlessly' },
  ];

  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex, viewPosition: 0.5 });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  const handleSlide = index => {
    setCurrentIndex(index);
    flatListRef.current.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
  };

  const renderItem = ({ item, index }) => {
    const active = index === currentIndex;
    return (
      <TouchableOpacity onPress={() => handleSlide(index)}>
        <Image source={item.image} style={[styles.image, !active && styles.hiddenImage]} contentFit="cover" />
      </TouchableOpacity>
    );
  };

  return (
    <View className='flex flex-col justify-center items-center w-full mt-10'>
      <View style={styles.imageContainer}>
        <View style={styles.imageinner}>
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onMomentumScrollEnd={event => {
              const slideIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
              setCurrentIndex(slideIndex);
            }}
            snapToInterval={Dimensions.get('window').width} // Adjust this value as needed
            decelerationRate="fast" // Experiment with different deceleration rates
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
              onPress={() => handleSlide(index)}
            />
          ))}
        </View>
        <Text style={styles.text}>{data[currentIndex].text}</Text>
        <Text style={styles.newtext}>{data[currentIndex].descriptionText}</Text>
      </View>
      <View style={styles.below_part} className='w-full px-5'>
        <View classNames='w-full'>
          <BtnGlobal
            styleClassName="button"
            title="Let's get started"
            onPress={() => router.push("/validateOtp")}
            classNames={'w-full'}
          />
        </View>
        <View style={styles.below_logo} className='mx-auto'>
          <Image
            source={require("../assets/CloftwareGroup.svg")}
            style={{ width: 200, height: 15 }}
            contentFit="contain"
          />
        </View>
      </View>
    </View>
  );
};

// Replace the styles constant with the following updated styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: 'center',
    color: '#2A2D32',
    maxWidth: 300,
    paddingTop: 10
  },
  newtext: {
    fontSize: 20,
    color: '#999999',
    textAlign: 'center',
    paddingTop: 20,
    maxWidth: 300,
    paddingBottom: 20
  },
  imageContainer: {
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',

  },
  imageinner: {
    width: '100%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {

  },
  hiddenImage: {
    display: "none",
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  below_part: {
    marginBottom: 30,
    // alignItems: 'center'
  },
  below_logo: {
    justifyContent: 'end',
    marginTop: 20
  }

});



export default SlideShow;
