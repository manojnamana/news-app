import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { NewType, RootStackParamList } from '@/utils/types';
import { Button, Card, useTheme } from 'react-native-paper';
import { NavigationProp, Route,  } from '@react-navigation/native';

type Props ={
  title: string;
  description: string;
  content: string;
  image_url: string;
  navigation: NavigationProp<RootStackParamList>; 
  handleDelete?:(val:string)=>(void)

}

const CardItem = (props: Props,) => {
  const theme = useTheme();

  const handlePress =()=>{
    props.navigation.navigate('NewsOverview',{
      title: props.title,
      description: props.description,
      content: props.content,
      image_url: props.image_url,
      
    })
  }
  return (
    <Pressable onPress={handlePress}>
      <Card style={{ marginVertical: 10, backgroundColor: theme.colors.elevation.level2 }}>
        <Card.Cover
          borderRadius={10}
          source={{ uri: props.image_url }} 
        />
        <Card.Title 
          title={props.title} 
          titleStyle={{ color: theme.colors.secondary }}
          subtitle={props.description ? props.description.split("\n")[0] : ''}
          titleNumberOfLines={1}
        />
      {props.handleDelete && ( <Card.Actions>
          <Button onPress={()=>props.handleDelete && props.handleDelete(props.title)}>Delete</Button>
        </Card.Actions>)}
      </Card>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
