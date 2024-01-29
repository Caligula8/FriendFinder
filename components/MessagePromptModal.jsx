import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const MessagePromptModal = ({
  isVisible,
  onClose,
  onSend,
  recipientUsername,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend({ recipient: recipientUsername, message });
    onClose();
  };

  useEffect(() => {
    // Reset message state when the modal visibility changes
    if (!isVisible) {
      setMessage("");
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        {/* captures taps on the entire screen */}
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            {/* prevent taps inside the modal from triggering onClose*/}
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Send a Message to {recipientUsername}
                </Text>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type your message..."
                  multiline
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSend}
                >
                  <Text style={styles.modalButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  messageInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e24e59",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MessagePromptModal;
