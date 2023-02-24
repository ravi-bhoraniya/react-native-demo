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
      ActivityIndicator,
      Alert
} from 'react-native';
import { getCategoryList, uploadProduct } from "../config/Modal";
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';


export default function AddProduct(props) {

      const [categoryList, setcategoryList] = useState([]);
      const [title, setTitle] = useState(null);
      const [description, setDescription] = useState(null);
      const [categoty, setcategoty] = useState(null);
      const [email, setemail] = useState(null);
      const [image, setimage] = useState(null);

      useEffect(() => {
            _getCategoryList();
      }, []);

      const _selectImage = async () => {
            let options = {
                  title: 'Select Image',
                  customButtons: [
                        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
                  ],
                  storageOptions: {
                        skipBackup: true,
                        path: 'images',
                  },
            };
            await launchCamera(options, (response) => {
                  if (response.didCancel) {
                        console.log('User cancelled image picker');
                  } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                        alert(response.customButton);
                  } else {
                        setimage({
                              uri: response.assets[0].uri,
                              type: response.assets[0].type,
                              name: response.assets[0].fileName,
                        })
                  }
            })
      }

      const _sendForm = () => {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (title == null || title == "" || description == null || description == "" || categoty == null || categoty == "" || email == null || email == "" || image == null || image == "") {
                  Alert.alert('Please fill the all value..');
                  return false;
            }
            if (!email.match(validRegex)) {
                  Alert.alert('Please enater valid email address.');
                  return false;
            }
            var data = new FormData();
            data.append('title', title);
            data.append('description', description);
            data.append('contact_email', email);
            data.append('product_category', categoty);
            //data.append('product_image', image);
            uploadProduct(data).then((result) => {
                  Alert.alert("Product successfully uploaded..");
                  props.navigation.push('Home');
            }).catch((e) => {
                  console.log(e);
            })
      }

      const _getCategoryList = () =>
            getCategoryList().then((result) => {
                  if (result.length > 0) {
                        var data = []
                        result.map((i, k) => {
                              data.push({ label: i, value: i })
                        })
                        setcategoryList(data);
                  }
            }).catch((e) => {
                  console.log(e)
            })


      return (
            <SafeAreaView style={{ flex: 1 }}>
                  <ScrollView style={styles.container}>
                        <TouchableOpacity style={styles.imageCover} onPress={() => _selectImage()}>
                              {
                                    image == null ?
                                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 200, width: '100%' }}>
                                                <View>
                                                      <Icon name="upload" size={30} color="#808080" style={{ alignSelf: 'center', marginBottom: 10 }} />
                                                      <Text style={{ color: '#808080', textAlign: 'center' }}>Upload Photo</Text>
                                                </View>
                                          </View>
                                          :
                                          <Image source={{ uri: image.uri }} style={{ height: 200 }} />
                              }
                        </TouchableOpacity>
                        <View style={styles.formBox}>
                              <View>
                                    <Text>Title</Text>
                                    <TextInput style={styles.inputBox} onChangeText={(e) => setTitle(e)} />
                              </View>
                              <View>
                                    <Text>Description</Text>
                                    <TextInput style={[styles.inputBox, { height: 200, textAlignVertical: 'top' }]} multiline={true} onChangeText={(e) => setDescription(e)} />
                              </View>
                              <View>
                                    <Text>Category </Text>
                                    <Dropdown
                                          labelField="label"
                                          valueField="value"
                                          style={{
                                                backgroundColor: '#F2EFEF',
                                                height: 40,
                                                paddingHorizontal: 10,
                                                marginBottom: 10,
                                          }}
                                          itemTextStyle={{
                                                color: '#000'
                                          }}
                                          data={categoryList}
                                          onChange={item => {
                                                setcategoty(item.value);
                                          }}
                                          placeholder="Select Category"
                                    />
                              </View>
                              <View>
                                    <Text>Email</Text>
                                    <TextInput style={styles.inputBox} onChangeText={(e) => setemail(e)} />
                              </View>
                              <View>
                                    <TouchableOpacity style={styles.btn} onPress={() => { _sendForm() }}>
                                          <Text style={styles.btnText}>ADD PRODUCT</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  </ScrollView>
            </SafeAreaView>
      )

}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#fff',
      },
      formBox: {
            paddingHorizontal: 20,
      },
      inputBox: {
            backgroundColor: '#F2EFEF',
            height: 40,
            paddingHorizontal: 10,
            marginBottom: 15,
      },
      btn: {
            backgroundColor: '#0C0B0B',
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 15
      },
      btnText: {
            color: '#fff',
            textAlign: 'center'
      },
      imageCover: {
            backgroundColor: '#000',
            height: 200,
            marginBottom: 15,
      }
})