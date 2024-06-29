// Accordion.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Accordion = ({ title, children, titleStyle, containerStyle, contentStyle }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={styles.toggleIcon}>{expanded ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>
      {expanded && <View style={[styles.content, contentStyle]}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 16,
  },
  toggleIcon: {
    fontSize: 16,
  },
  content: {
    padding: 10,
    backgroundColor: '#e1e1e1',
  },
});

export default Accordion;


// export default function App() {
//     return (
//       <ScrollView style={styles.container}>
//         <Accordion
//           title="Section 1"
//           titleStyle={styles.sectionTitle}
//           containerStyle={styles.sectionContainer}
//           contentStyle={styles.sectionContent}
//         >
//           <Text>This is the content of section 1.</Text>
//         </Accordion>
//         <Accordion
//           title="Section 2"
//           titleStyle={styles.sectionTitle2}
//           containerStyle={styles.sectionContainer2}
//           contentStyle={styles.sectionContent2}
//         >
//           <Text>This is the content of section 2.</Text>
//         </Accordion>
//       </ScrollView>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       padding: 20,
//     },
//     sectionTitle: {
//       color: '#ff6347',
//     },
//     sectionContainer: {
//       borderBottomWidth: 1,
//       borderBottomColor: '#ddd',
//     },
//     sectionContent: {
//       backgroundColor: '#ffe4e1',
//     },
//     sectionTitle2: {
//       color: '#4682b4',
//     },
//     sectionContainer2: {
//       borderBottomWidth: 1,
//       borderBottomColor: '#aaa',
//     },
//     sectionContent2: {
//       backgroundColor: '#e6e6fa',
//     },
//   });