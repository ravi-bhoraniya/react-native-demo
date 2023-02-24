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
import { SliderBox } from "react-native-image-slider-box";
import { getProductDetail } from "../config/Modal";
import Icon from 'react-native-vector-icons/AntDesign';


export default function Detail(props) {

      const [productDetail, setproductDetail] = useState(null);

      useEffect(() => {
            _getProductDetails();
      }, [])

      const _getProductDetails = () => {
            getProductDetail(props.route.params.pId).then((result) => {
                  setproductDetail(result);
            }).catch((e) => {
                  console.log(e)
            })
      }

      return (
            <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView style={styles.container}>
                        {
                              productDetail != null ?
                                    <View>
                                          <SliderBox images={productDetail.images} sliderBoxHeight={250} />
                                          <TouchableOpacity style={styles.back} onPress={() => { props.navigation.goBack(); }}>
                                                <Icon name="left" size={30} color="#fff" />
                                          </TouchableOpacity>
                                          <View style={styles.labBox}>
                                                <View>
                                                      <Text style={styles.cntTitle}>Brand</Text>
                                                      <Text style={styles.cntDes}>{productDetail.brand}</Text>
                                                </View>
                                                <View>
                                                      <Text style={styles.cntTitle}>Price</Text>
                                                      <Text style={styles.cntDes}>${productDetail.price}</Text>
                                                </View>
                                                <View>
                                                      <Text style={styles.cntTitle}>Stock</Text>
                                                      <Text style={styles.cntDes}>{productDetail.stock}</Text>
                                                </View>
                                                <View>
                                                      <Text style={styles.cntTitle}>Rating</Text>
                                                      <Text style={styles.cntDes}>{productDetail.rating}</Text>
                                                </View>
                                          </View>
                                          <View style={styles.cntBox}>
                                                <Text style={styles.cntTitle}>Category</Text>
                                                <Text style={styles.cntDes}>{productDetail.category}</Text>
                                                <Text style={[styles.cntTitle, { marginTop: 15 }]}>Description</Text>
                                                <Text style={styles.cntDes}>{productDetail.description}</Text>
                                          </View>
                                    </View>
                                    :
                                    <ActivityIndicator style={{ marginTop: 200 }} />
                        }
                  </ScrollView>
            </SafeAreaView>
      )

}


const styles = StyleSheet.create({
      labBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 10,
      },
      cntBox: {
            padding: 20
      },
      cntTitle: {
            color: "#04040480",
            fontSize: 20
      },
      cntDes: {
            color: '#060606',
            fontSize: 16,
            lineHeight: 22
      },
      back: {
            position: 'absolute',
            left: 20,
            top: 20
      }
})