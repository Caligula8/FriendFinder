import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MessagePromptModal = ({
  isVisible,
  onClose,
  onSend,
  recipientUsername,
}) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") {
      // If the message is empty on send attempt
      setErrorMessage("Message cannot be empty");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    // Proceed with sending the message
    onSend({ recipient: recipientUsername, message });
    onClose();
  };

  useEffect(() => {
    // Reset message state and error message when the modal visibility changes
    if (!isVisible) {
      setMessage("");
      setErrorMessage("");
    }
  }, [isVisible]);

  return (
    isVisible && (
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Send a Message to {recipientUsername}
              </Text>
              <View style={styles.inputAndSendContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.messageInput}
                    placeholder="Type your message..."
                    multiline
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    placeholderTextColor="#8D8D8D"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSend}
                >
                  <MaterialCommunityIcons
                    name="send-circle-outline"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              {errorMessage !== "" && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputAndSendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDDBDD",
    backgroundColor: "white",
    paddingHorizontal: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    elevation: 4,
  },
  messageInput: {
    flexGrow: 1,
    minHeight: 40,
    maxHeight: 160,
    paddingVertical: 8,
    color: "black",
  },
  sendButton: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: "#e24e59",
  },
  errorMessage: {
    color: "#8D8D8D",
  },
});

export default MessagePromptModal;
