import React from "react";
import { NativeWindStyleSheet } from "nativewind";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  Login,
  Register1,
  Register2,
  Register3,
  WelcomeScreen,
  TestScreen,
  TestScreen2,
  TestScreen3,
  SplashScreen,
  ChatsListScreen,
  MyProfileScreen,
  MyPublicProfileScreen,
  SelectedPublicProfile,
  ReSelectHobbiesScreen,
  SettingsScreen,
  BrowseCategoriesScreen,
  BrowsePostsScreen,
  ExpandedPostScreen,
  CreatePostScreen,
} from "./screens";

import { Provider } from "react-redux";
import Store from "./context/store";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register1" component={Register1} />
          <Stack.Screen name="Register2" component={Register2} />
          <Stack.Screen name="Register3" component={Register3} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chats" component={ChatsListScreen} />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
          <Stack.Screen
            name="MyPublicProfile"
            component={MyPublicProfileScreen}
          />
          <Stack.Screen
            name="ReSelectHobbies"
            component={ReSelectHobbiesScreen}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Categories" component={BrowseCategoriesScreen} />
          <Stack.Screen name="Posts" component={BrowsePostsScreen} />
          <Stack.Screen name="FullScreenPost" component={ExpandedPostScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="Test2" component={TestScreen2} />
          <Stack.Screen name="Test3" component={TestScreen3} />
          <Stack.Screen
            name="SelectedPublicProfile"
            component={SelectedPublicProfile}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
