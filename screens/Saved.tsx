// @ts-nocheck


import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { ComponentNavigationType, NewType } from '@/utils/types';
import CardItem from '@/components/CardItem';


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@newsdata');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    alert("Something went wrong");
    return;
  }
};

const storeData = async (value:string) => {
  const data:NewType[]=(await getData()) || [];
 const filter = data.filter((news)=>news.title !== value)
  try {
    const jsonValue = JSON.stringify(filter);
    await AsyncStorage.setItem('@newsdata', jsonValue);
  } catch (e) {
    return alert('Something went wrong with storing data')
  }
};


const Saved = (props:ComponentNavigationType) => {
  const focused = useIsFocused()
  const [savedNews, setSavedNews] = useState([])

  const deleteHandler = async(val:string)=>{
    await storeData(val)
   }
  useEffect(()=>{
    getData().then((data)=>setSavedNews(data)).catch(err=>alert("Error Occured"))
  },[focused])


  return (
    <View style={{flex:1}}>
       <Appbar.Header>
        <Appbar.Content title="Saved" />
      </Appbar.Header>
      
      <FlatList
        keyExtractor={(item)=>item.title}
        style={styles.flatLIst}
        data={savedNews}
        renderItem={({ item }) => (
          <CardItem
           handleDelete={deleteHandler}
            content={item.content}
            description={item.description}
            image_url={item.image_url}
            title={item.title} 
            navigation={props.navigation}                     />
        )}
      />
      {/* {savedNews && savedNews.length >0 && savedNews.map((data:NewType)=>(
        <CardItem 
        content={data.content}
        title={data.title}
        description={data.description || ""}
        image_url={data.image_url}
        key={data.title}
        navigation={props.navigation}
        />
      )
      ) } */}
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  flatLIst:{
    flex:1,
    height: 'auto',

  }
})