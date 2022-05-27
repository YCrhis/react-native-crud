import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";

import { db } from "../database/firebase";

const CreateUser = (props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChangeText = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const AddNewUser = async () => {
    if (form.name === "" || form.email === "" || form.phone === "") {
      alert("Please, enter all the data");
    } else {
      try {
        await db.collection("user").add({
          name: form.name,
          email: form.email,
          phone: form.phone,
        });
        props.navigation.navigate("UserList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <Button title="Save User" onPress={AddNewUser} />
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
});

export default CreateUser;
