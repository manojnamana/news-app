import { NavigationProp, RouteProp } from "@react-navigation/native";

// Define the parameters for your routes
export type RootStackParamList = {
    Home: undefined; // No params expected for HomeScreen
    NewsOverview: {  title: string;
        description: string;
        content: string;
        image_url: string;}; // No params for NewsOverview
    ArticleDetails: { articleId: string }; // Params for ArticleDetails route
  };
  

export type NewType = {

  title: string;

  description: string;
  content: string;
  image_url: string;
  
};

export type ComponentNavigationType = {
  navigation: NavigationProp<RootStackParamList, 'NewsOverview'>; // Define 'Home' or other routes here
  route: RouteProp<RootStackParamList, 'NewsOverview'>; // Define 'Home' or other routes here
};
