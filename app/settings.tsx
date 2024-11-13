import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Setting() {
  const [mosqueName, setMosqueName] = useState("");
  const [address, setAddress] = useState("");
  const [iqomatDelay, setIqomatDelay] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedMosqueName = await AsyncStorage.getItem("mosqueName");
      const storedAddress = await AsyncStorage.getItem("address");
      const storedIqomatDelay = await AsyncStorage.getItem("iqomatDelay");

      if (storedMosqueName) setMosqueName(storedMosqueName);
      if (storedAddress) setAddress(storedAddress);
      if (storedIqomatDelay) setIqomatDelay(storedIqomatDelay);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem("mosqueName", mosqueName);
      await AsyncStorage.setItem("address", address);
      await AsyncStorage.setItem("iqomatDelay", iqomatDelay);
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/" style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Link>
        <Text style={styles.title}>Pengaturan Masjid</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Masjid</Text>
            <TextInput
              style={styles.input}
              value={mosqueName}
              onChangeText={setMosqueName}
              placeholder="Masukkan nama masjid"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Alamat</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Masukkan alamat masjid"
              multiline
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jeda Waktu Iqomat (menit)</Text>
            <TextInput
              style={styles.input}
              value={iqomatDelay}
              onChangeText={setIqomatDelay}
              placeholder="Masukkan jeda waktu iqomat"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
