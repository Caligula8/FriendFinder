import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/Navbar";
import ContinueButton from "../components/ContinueButton";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";

// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, addDoc, arrayUnion, Timestamp, collection, updateDoc } from "firebase/firestore";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleAttachImages = () => {
    //navigation.navigate("Register3");
  };

  const handleSelectTags = () => {
    //navigation.navigate("Register3");
  };

  const handlePost = async () => {

    const userID = firebaseAuth.currentUser.uid;
    const userRef = doc(firestoreDB, "users", userID);

    const postRef = await addDoc(collection(firestoreDB, "posts"), {
      content: postBody,
      title: postTitle,
      timestamp: Timestamp.now(),
      user: userID
    });

    // add code to update in posts field in the relevant docs in collection "hobbies"
    // 
      
    await updateDoc(userRef, {
      posts: arrayUnion(postRef.id)
    });


    //navigation.navigate("Register3");
  };
  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <View style={globalStyles.header}>
        {/* Back Button */}
        <View style={globalStyles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* Header Title */}
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Create a Post</Text>
        </View>
      </View>
      {/* Content */}
      <View style={ggg.contentContainer}>
        <Text style={globalStyles.subTitle}>Title</Text>
        <TextInput
          style={ggg.textInput}
          placeholder=""
          multiline
          value={postTitle}
          onChangeText={(text) => setPostTitle(text)}
        />
        <Text style={globalStyles.subTitle}>Body</Text>
        <TextInput
          style={ggg.textInputPostBody}
          placeholder=""
          multiline
          value={postBody}
          onChangeText={(text) => setPostBody(text)}
        />

        {/* Buttons */}
        <View style={ggg.buttonContainer}>
          <ContinueButton
            onPress={handleAttachImages}
            buttonText="Attach Images"
            transparency={0.7}
          />
          <ContinueButton
            onPress={handleSelectTags}
            buttonText="Select Tags"
            transparency={0.7}
          />
          <ContinueButton onPress={handlePost} buttonText="Post" />
        </View>
      </View>

      {/* Footer & Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

const ggg = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  textInput: {
    width: "100%",
    height: 64,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginVertical: 10,
  },
  textInputPostBody: {
    width: "100%",
    height: 160,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginVertical: 10,
    textAlign: "left",
    textAlignVertical: "top",
  },
});

export default CreatePostScreen;
