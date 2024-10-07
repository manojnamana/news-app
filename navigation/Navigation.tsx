// @ts-nocheck

import NewsOverview from "@/screens/NewsOverview";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "@/screens/Home";
import Saved from "@/screens/Saved";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home"
       options={{
        tabBarIcon(props){
        return <Icon
        
         name={props.focused? "home-circle":"home-circle-outline"} 
         {...props}/>
        
      }}} component={Home} />
      <Tab.Screen name="Saved" component={Saved}
      options={{
        tabBarIcon(props){
        return <Icon
        
         name={props.focused? "content-save":"content-save-outline"} 
         {...props}/>
        
      }}} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator >
        {/* Updated name from "Home Screen" to "Home" */}
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}  />
        <Stack.Screen name="NewsOverview" component={NewsOverview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
