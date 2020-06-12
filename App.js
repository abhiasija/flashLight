import React, { useEffect, useState } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import * as Brightness from 'expo-brightness';
import { Camera } from 'expo-camera';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  const [permission,setPermission] = useState(false)
  const [enable,setEnable] = useState(false)
  const [type,setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(false);
  const [flash,setFlash] = useState(Camera.Constants.FlashMode.off)

  useKeepAwake()
  
  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      setPermission(status === 'granted')
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  

  return (

    <View style={{
      flex: 1,
      backgroundColor: enable? '#fff' : 'grey',
      alignItems: 'center',
      justifyContent: 'center'
      }}>

      
      <Camera flashMode={flash} type = {type}></Camera>

      <TouchableOpacity 
        onPress = {()=> {
          if(!enable){
            Brightness.setBrightnessAsync(1)
          }else{
            Brightness.useSystemBrightnessAsync()
            }
          setEnable(enable ? false : true)
          }
        } 
      >
        <View style={{
          width:200, 
          height:50, 
          margin:30,
          backgroundColor: enable ? 'grey' : '#fff', 
          justifyContent:'center',
          borderRadius:25
        }}>
          <Text style={{
            alignSelf:'center', 
            fontSize:22
          }}>
            {enable?'Normal':'Brighten'}
          </Text>
        </View>
      </TouchableOpacity>




      <View style = {{
        width:154, 
        height:53, 
        margin:30,
        borderColor:'cyan',
        borderWidth:2,
        borderRadius:28,
        flexDirection:'row',
      }}>
      <TouchableOpacity 
        onPress = {()=> {
          setType(Camera.Constants.Type.back)
          }
        } 
        disabled = {type == Camera.Constants.Type.back || flash == Camera.Constants.FlashMode.torch}
      >
        <View style={{
          width:75, 
          height:50, 
          borderTopLeftRadius:25,
          borderBottomLeftRadius:25,
          backgroundColor: type == Camera.Constants.Type.back 
          ? 'cyan' : 'grey', 
          justifyContent:'center',
        }}>
          <Text style={{
            alignSelf:'center', 
            fontSize:22
          }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress = {()=> {
          setType(Camera.Constants.Type.front)
          }
        } 
        disabled = {type == Camera.Constants.Type.front || flash == Camera.Constants.FlashMode.torch}
      >
        <View style={{
          width:75, 
          height:50, 
          borderTopRightRadius:25,
          borderBottomRightRadius:25,
          backgroundColor: type == Camera.Constants.Type.front 
          ? 'cyan' : 'grey', 
          justifyContent:'center',
        }}>
          <Text style={{
            alignSelf:'center', 
            fontSize:22
          }}>
            Front
          </Text>
        </View>
      </TouchableOpacity>
      </View>




      <TouchableOpacity
        onPress = {()=> {
          setFlash(flash == Camera.Constants.FlashMode.torch 
          ? Camera.Constants.FlashMode.off 
          : Camera.Constants.FlashMode.torch)
          }
        }
      >
        <View style={{
          width:200, 
          height:50, 
          margin:30,
          backgroundColor: enable ? 'grey' : '#fff', 
          justifyContent:'center',
          borderRadius:25
        }}>
          <Text style={{
            alignSelf:'center', 
            fontSize:22
          }}>
            {flash == Camera.Constants.FlashMode.torch ? 'Flash OFF' : 'Flash ON'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
