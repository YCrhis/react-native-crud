import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { db } from "../database/firebase";

const UserDetail = (props) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    id: "",
  };

  const [user, setuser] = useState();

  const [loading, setLoading] = useState(true);

  const getUser = async (id) => {
    const dbRes = db.collection("user").doc(id);
    const doc = await dbRes.get();
    const user = doc.data();
    setuser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  const handleChangeText = (name, value) => {
    setuser({ ...user, [name]: value });
  };

  const DeleteUser = async () => {
    const res = db.collection("user").doc(props.route.params.userId);
    await res.delete();
    props.navigation.navigate("UserList");
  };

  const openConfirmation = () => {
    Alert.alert("Remove User", "Are you sure?", [
      { text: "yes", onPress: () => DeleteUser() },
      { text: "no", onPress: () => console.log(false) },
    ]);
  };

  const updateUser = async () => {
    const res = db.collection("user").doc(props.route.params.userId);
    await res.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setuser(initialState);
    props.navigation.navigate("UserList");
  };

  useEffect(() => {
    getUser(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View style={styles.buttonDelete}>
        <Button title="Update User" onPress={() => updateUser()} />
      </View>
      <View style={styles.buttonDelete}>
        <Button
          title="Delete User"
          color={"#000"}
          onPress={() => openConfirmation()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  container: {
    flex: 1,
    padding: 35,
  },
  buttonDelete: {
    marginTop: 12,
  },
});

export default UserDetail;
