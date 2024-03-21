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
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import NavBar from "../../components/Navbar";
import ContinueButton from "../../components/ContinueButton";
import SelectTagsMenu from "../../components/SelectTagsMenu";
import { globalStyles } from "../../styles/globalStyles";
import { useSelector } from "react-redux";
import { firestoreDB, firebaseStorage } from "../../config/firebase.config";
import {
  doc,
  addDoc,
  arrayUnion,
  Timestamp,
  collection,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [images, setImages] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isSelectTagsMenuVisible, setIsSelectTagsMenuVisible] = useState(false);
  const route = useRoute();
  const categoryName = route.params?.categoryName;
  const [selectedTags, setSelectedTags] = useState([categoryName]);

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

  const handleSelectTags = () => {
    setIsSelectTagsMenuVisible(true);
  };

  const handlePost = async () => {
    // Extract the current timestamp to use in the post summary prefix
    const FireBaseTimeStamp = Timestamp.now();
    const timestamp = FireBaseTimeStamp.toDate().toISOString();
    const unixTimestamp = Math.floor(Date.now() / 1000).toString();
    const postSummaryPrefix = `${unixTimestamp}_${user._id}`;
    const userDocRef = doc(firestoreDB, "users", user._id);

    try {
      // Upload each selected image to Firebase Storage and get their download URLs
      const imageUploadPromises = images.map(async (image, index) => {
        const imageUri = image.uri;
        const fileExtension = imageUri.split(".").pop(); // Extract file extension
        const imageName = `${postSummaryPrefix}_${index}.${fileExtension}`;
        const storageRef = ref(firebaseStorage, `post_images/${imageName}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob); // Upload image to Firebase Storage
        const downloadURL = await getDownloadURL(storageRef); // Get URL for uploaded image
        return downloadURL; // Return the download URL for the uploaded image
      });

      const imageUrls = await Promise.all(imageUploadPromises); // Wait for all images to be uploaded and URLs to be fetched

      // Iterate through the selected tags, creating or updating posts accordingly
      for (const hobby of selectedTags) {
        const hobbyRef = doc(firestoreDB, "posts", hobby);
        const contentCollectionRef = collection(hobbyRef, "content");
        const postDocRef = await addDoc(contentCollectionRef, {
          author: user.displayName,
          authorID: user._id,
          content: postBody,
          tags: selectedTags,
          title: postTitle,
          timestamp: timestamp,
          images: imageUrls, // Include the array of image URLs in the post document
        });

        //Post Summary
        const postSummary = {
          reference: postDocRef,
          timestamp: timestamp,
          title: postTitle,
        };

        // Construct the post summary object explicitly for transaction updates
        const updateObject = {};
        updateObject[postSummaryPrefix] = postSummary;

        await runTransaction(firestoreDB, async (transaction) => {
          const hobbyDoc = await transaction.get(hobbyRef);
          if (!hobbyDoc.exists()) {
            transaction.set(hobbyRef, { [postSummaryPrefix]: postSummary });
          } else {
            transaction.update(hobbyRef, updateObject);
          }
        });

        // Update the user's document with the new post ID
        await updateDoc(userDocRef, {
          posts: arrayUnion(postDocRef.path),
        });
      }

      console.log("Post creation and updates were successful.");
      navigation.goBack(); // Navigate back after successful post creation
    } catch (error) {
      console.error("Error creating post or updating documents:", error);
      // Need to handle error properly with error message
    }
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

      {/* Transparent Overlay */}
      {isSelectTagsMenuVisible && (
        <TouchableWithoutFeedback
          onPressOut={() => setIsSelectTagsMenuVisible(false)}
        >
          <View style={ggg.overlay}>
            {/* SelectTagsMenu */}
            <View style={ggg.menuContainer}>
              <SelectTagsMenu
                isVisible={isSelectTagsMenuVisible}
                onClose={() => setIsSelectTagsMenuVisible(false)}
                onTagsSelected={(tags) => {
                  setSelectedTags(tags);
                  setIsSelectTagsMenuVisible(false);
                }}
                userHobbies={user.hobbies || []}
                initialSelectedTags={selectedTags}
                categoryName={categoryName}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const ggg = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
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
