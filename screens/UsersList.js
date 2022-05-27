import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native";
import { db } from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UsersList = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    db.collection("user").onSnapshot((querySnapshot) => {
      const users = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });

      setList(users);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUser")}
      />
      {list.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() =>
              props.navigation.navigate("UserDetail", {
                userId: user.id,
              })
            }
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UsersList;
