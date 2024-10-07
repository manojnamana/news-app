import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text, useTheme } from 'react-native-paper'

type Props ={
    title: string;
    description: string;
    content: string;
    image_url: string;
  
  }

const DetailCard = (props:Props) => {
    const theme = useTheme()
  return (
    <ScrollView>
      
      <Text style={{marginVertical:10,color:"black"}}  variant='headlineMedium'>{props.title}</Text>
        <Card style={{backgroundColor:theme.colors.background}}
         contentStyle ={{width:Dimensions.get("window").width}}
         >
            {props.image_url && (
                <Card.Cover source={{uri:props.image_url}}></Card.Cover>
            )}
            <Card.Content>
                <Text
                textBreakStrategy='highQuality'
                 variant='bodyMedium'  style={{textAlign:'left',marginVertical:10,overflow:'visible'}}>{props.description}</Text>
            </Card.Content>
         </Card>
    </ScrollView>
  )
}

export default DetailCard

const styles = StyleSheet.create({})