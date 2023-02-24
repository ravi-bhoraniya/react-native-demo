import React, { useState, useEffect } from "react";
import {
      SafeAreaView,
      ScrollView,
      StatusBar,
      Image,
      StyleSheet,
      Text,
      useColorScheme,
      View,
      TouchableOpacity,
      TextInput,
      FlatList,
      ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { getProductList, searchProductList } from "../config/Modal";


export default function Home(props) {

      const [productList, setProductList] = useState([]);
      const [loader, setloader] = useState(true);

      useEffect(() => {
            _getProductList();
      }, [])

      const _getProductList = () => {
            const Param = {};
            getProductList(Param).then((result) => {
                  setProductList(result.products);
                  setloader(false);
            }).catch((e) => {
                  console.log(e)
                  setloader(false);
            })
      }

      const _getSearchProductList = (data) => {
            const Param = { q: data };
            setloader(true);
            searchProductList(Param).then((result) => {
                  setProductList(result.products);
                  setloader(false);
            }).catch((e) => {
                  console.log(e);
                  setloader(false);
            })
      }

      return (
            <SafeAreaView style={styles.container}>
                  <View style={styles.headerBox}>
                        <Text style={styles.mainTitle}>All Products</Text>
                        <TouchableOpacity onPress={() => { props.navigation.push('AddProduct'); }}>
                              <Icon name="plus" size={30} color="#000" />
                        </TouchableOpacity>
                  </View>
                  <View>
                        <TextInput style={styles.searchBox} placeholder="Search products" onChangeText={(e) => { _getSearchProductList(e) }} />
                  </View>
                  <View>
                        {
                              loader == true ?
                                    <ActivityIndicator style={{ marginTop: 20 }} />
                                    :
                                    <FlatList
                                          data={productList}
                                          renderItem={({ item }) => {
                                                return (
                                                      <TouchableOpacity style={styles.listBox} onPress={() => { props.navigation.push('Detail', { pId: item.id }) }}>
                                                            <View style={styles.listBoxOne}>
                                                                  <Image style={styles.listBoxImage} source={{ uri: item.thumbnail }} />
                                                            </View>
                                                            <View style={styles.listCnt}>
                                                                  <Text style={styles.listCntTitle} numberOfLines={1}>{item.title}</Text>
                                                                  <Text style={styles.listCntDes} numberOfLines={2}>{item.description}</Text>
                                                            </View>
                                                      </TouchableOpacity>
                                                )
                                          }}
                                          keyExtractor={item => item.id}
                                    />
                        }

                  </View>
            </SafeAreaView>
      )

}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            paddingTop: 10,
      },
      mainTitle: {
            color: "#000000",
            fontSize: 30,
      },
      listBox: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#0202021A'
      },
      listBoxImage: {
            width: 80,
            height: 80,
            borderRadius: 50,
      },
      listBoxOne: {
            width: '20%',
      },
      listCnt: {
            paddingHorizontal: 20,
            width: '80%',
      },
      listCntTitle: {
            color: '#060606',
            fontSize: 20,
            fontWeight: 'bold',
      },
      listCntDes: {
            color: '#05050580',
            fontSize: 16,
      },
      searchBox: {
            backgroundColor: '#F2EFEF',
            height: 40,
            marginVertical: 15,
            paddingHorizontal: 10,
      },
      headerBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
      }
})