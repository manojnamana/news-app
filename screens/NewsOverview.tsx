import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ComponentNavigationType, NewType } from '@/utils/types'
import DetailCard from '@/components/DetailCard'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@newsdata');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    alert("Something went wrong");
    return;
  }
};


const storeData = async (value:NewType) => {
  const data:NewType[]=(await getData()) || [];

  !data.find((d)=>d.title === value.title)?data.push(value):data;
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@newsdata', jsonValue);
  } catch (e) {
    return alert('Something went wrong with storing data')
  }
};



export default function NewsOverview(props:ComponentNavigationType) {
  const title = props?.route?.params?.title
  const content = props?.route?.params?.content
  const description = props?.route?.params?.description
  const image_url = props?.route?.params?.image_url

  props.navigation.setOptions({headerRight:()=>
  <Button onPress={()=>storeData({title,description,image_url,content})}>Save</Button>})
  return (
    <DetailCard content={content} image_url={image_url}
    title={title} description={description}/>
  )
}

const styles = StyleSheet.create({

});