import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateUser from "./screens/CreateUser";
import UserDetail from "./screens/UserDetail";
import UsersList from "./screens/UsersList";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserList"
        component={UsersList}
        options={{ title: "Users List" }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{ title: "Create A New List" }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{ title: "User Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
