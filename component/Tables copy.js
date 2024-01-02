import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const Tables = ({ data, columns, onRowPress, renderRowActions }) => {
  const [searchText, setSearchText] = useState("");

const filteredData = data;
  // const filteredData = data?.filter(
  //   (item) =>
  //     item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item?.description?.toLowerCase().includes(searchText.toLowerCase())
  // );


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onRowPress(item)}>
      <View style={styles.row}>
        {columns.map((column, index) => (
          <View key={index} style={styles.cellParent}>
            {index === 0 ? <View style={styles.viewHead}>
              <View style={styles.cellLeftA1}>{column.header}</View>
              <View style={styles.cellA1}>{item[column.accessor]}</View>
            </View> :
           <View style={styles.viewBody}>
            <View style={styles.cellLeft}>{column.header}</View>
            <View style={styles.cell}>{item[column.accessor]}</View>
            </View>
            }
          </View>
        ))}

        {renderRowActions.length > 0 && (
          <View style={styles.actions}>
            {renderRowActions.map((action, index) => (
              <TouchableOpacity
               style={styles.actionsBtn}
                key={index}
                // onClick={() => action.onClick(row)}
                // onPress={() => handleDetailAction(item)}
              >
                <Text style={styles.actionsBtnText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* <View style={styles.actions}>
          {renderRowActions && renderRowActions(item)}
        </View> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        style={styles.searchInput}
      />

     <View style={styles.tableData}>

     </View>

      {/* <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        
        // ListHeaderComponent={() => (
        //   <View style={styles.row}>
        //     {columns.map((column, index) => (
        //       <Text key={index} style={styles.cell}>
        //         {column.header}
        //       </Text>
        //     ))}
        //     <Text style={styles.actionsHeader}>Actions</Text>
        //   </View>
        // )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchInput: {
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  row: {
    width: "100%",
    alignItems: "center",
    padding: 0,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom:8,
    borderLeftWidth: 2,
    borderLeftColor: "#0395FF",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderRadius:8
  },
  cell: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom:0
  },
  cellA1: {
    flex: 1,
    paddingHorizontal: 0,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical:10,
    justifyContent:'flex-end'
  },
  actionsHeader: {
    width: 80,
    paddingHorizontal: 12,
    //fontWeight: 600,
  },
  cellParent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  cellLeft: {
    width: '100%',
    justifyContent: "flex-start",
    paddingBottom:2,
  },
  cellLeftA1: {
    width: 120,
  },
  viewHead:{
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical:5,
    flexDirection:'row',
    borderColor: "#ddd",
    borderBottomWidth: 1,
    color: '#FF5315'

  },
  viewBody:{
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical:8,
    flexDirection:'collum',
    borderColor: "#ddd",
    borderBottomWidth: 1,
  },
  actionsBtn:{
    padding:6,
    backgroundColor: '#3d5ee1',
    marginLeft:8,
   borderRadius:8,
   paddingHorizontal:10,
  },
  actionsBtnText:{
    color: '#fff'
  }
});

export default Tables;
