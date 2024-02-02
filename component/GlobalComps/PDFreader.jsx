import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';

const PDFreader = ({path = 'https://clofterbucket.s3.ap-south-1.amazonaws.com/book_schedule/Free-Cute-Timetable-Template-A4.pdf' , Heading = 'Your PDF'}) => {
    const PdfResource = { uri: path, cache: true };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Heading}</Text>
            <Pdf 
                trustAllCerts={false}
                source={PdfResource}
                style={styles.pdf}
                onLoadComplete={(numberOfPages, filePath) => {
                    // console.log(`number of pages: ${numberOfPages}`);
                }}
            />
        </View>
    )
}

export default PDFreader

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 50
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})