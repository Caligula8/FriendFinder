import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import NavBar from "../../components/Navbar";
import ContinueButton from "../../components/ContinueButton";
import { globalStyles } from "../../styles/globalStyles";
import { useSelector } from "react-redux";
import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import {
  doc,
  addDoc,
  arrayUnion,
  Timestamp,
  collection,
  updateDoc,
} from "firebase/firestore";
import { firebaseStorage } from "../../config/firebase.config";
import { ref } from "firebase/storage";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [images, setImages] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  // Request permissions
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please allow access to your media library in your app settings in order to attach images."
      );
      return false;
    }
    return true;
  };

  const handleAttachImages = async () => {
    const hasPermission = await requestMediaLibraryPermission();

    if (!hasPermission) {
      return;
    }
    // Check if the maximum limit of images is reached
    if (images.length >= 3) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    };

    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Use the first asset's URI
        const selectedUri = result.assets[0].uri;
        // Update state with selected image URI
        setImages((prevImages) => [...prevImages, { uri: selectedUri }]);
      } else {
        console.log("Unexpected result:", result);
      }
    } catch (error) {
      console.error("Error launching image library:", error);
    }
  };

  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <View key={index} style={ggg.uploadedImageContainer}>
          <Image
            source={{ uri: image.uri }}
            style={ggg.uploadedImage}
            onError={(error) => console.error("Image Load Error:", error)}
          />
          <TouchableOpacity
            style={ggg.closeButton}
            onPress={() => handleRemoveImage(index)}
          >
            <Ionicons name="close-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      );
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const time = Timestamp.now();
  //const time = Timestamp.now().getSeconds();
  const userID = firebaseAuth.currentUser.uid;
  let fileCounter = 0;
  const storageRefArr = [];
  // const storageRef = ref(firebaseStorage);

  const handleAttachImages11111111111 = () => {
    // make file path
    const path = userID + "/" + time + "_" + fileCounter;
    fileCounter = fileCounter + 1;
    // make storage reference
    const storageRef = ref(firebaseStorage, path);
    // storageRefArr.push({ file: ...uploadedFile, ref: ...storageRef });
    //navigation.navigate("Register3");
  };

  const handleSelectTags = () => {
    // Handle tag selection
  };

  const handlePost = async () => {
    const userRef = doc(firestoreDB, "users", userID);

    const postRef = await addDoc(collection(firestoreDB, "posts"), {
      content: postBody,
      title: postTitle,
      timestamp: Timestamp.now(),
      user: userID,
    });

    // add code to update in posts field in the relevant docs in collection "hobbies"
    // who wrote this above comment me or you?

    await updateDoc(userRef, {
      posts: arrayUnion(postRef.id),
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

        {/* Render uploaded images */}
        <View style={ggg.uploadedImagesContainer}>{renderImages()}</View>

        {/* Warning message container */}
        {showWarning && (
          <View style={ggg.warningContainer}>
            <Text style={ggg.warningText}>
              A maximum of 3 images are allowed
            </Text>
          </View>
        )}

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
    flexGrow: 1,
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
    height: 140,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginVertical: 10,
    textAlign: "left",
    textAlignVertical: "top",
  },
  uploadedImagesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    marginBottom: 5,
  },
  uploadedImageContainer: {
    position: "relative",
    marginRight: 15,
  },
  uploadedImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "grey",
    borderRadius: 15,
    padding: 2,
    zIndex: 1,
  },
  warningContainer: {
    padding: 10,
  },
  warningText: {
    color: "#E24E59",
    textAlign: "center",
  },
});

export default CreatePostScreen;
