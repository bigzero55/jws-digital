import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import changeScreenOrientation from "@/libs/orientation";
import { StatusBar } from "expo-status-bar";
import { Prayer, TranslationEnum } from "islam.js";
import { useEffect, useState } from "react";

changeScreenOrientation();

type PrayerTiming = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export default function Index() {
  const [timing, setTimimg] = useState<PrayerTiming>();

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(TranslationEnum);

    const prayer = new Prayer();
    const city = "Bandung";
    const country = "Indonesia";
    const getTiming = async () => {
      try {
        const prayerTimings = await prayer.getPrayerTimesByCity(city, country);
        setTimimg(prayerTimings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setTimimg({
          Fajr: "--:--",
          Dhuhr: "--:--",
          Asr: "--:--",
          Maghrib: "--:--",
          Isha: "--:--",
        });
      }
    };
    getTiming();
  }, []); // Added dependency array to prevent infinite loop

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Text style={styles.mosqueName}>Masjid Al-Iman</Text>
        <Text style={styles.address}>Jl. Example Street No. 123, City</Text>
        <Link href="/settings" style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </Link>
      </View>
      <View style={styles.prayerSchedule}>
        <Text style={styles.scheduleTitle}>Jadwal Shalat</Text>
        <View style={styles.digitalClock}>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>
        <View style={styles.scheduleGrid}>
          <View style={styles.scheduleItem}>
            <Text style={styles.prayerName}>Subuh</Text>
            <Text style={styles.prayerTime}>{timing?.Fajr || "--:--"}</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.prayerName}>Dzuhur</Text>
            <Text style={styles.prayerTime}>{timing?.Dhuhr || "--:--"}</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.prayerName}>Ashar</Text>
            <Text style={styles.prayerTime}>{timing?.Asr || "--:--"}</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.prayerName}>Maghrib</Text>
            <Text style={styles.prayerTime}>{timing?.Maghrib || "--:--"}</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.prayerName}>Isya</Text>
            <Text style={styles.prayerTime}>{timing?.Isha || "--:--"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.hadithContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.hadithText}>
            "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia
            lainnya" (HR. Ahmad, ath-Thabrani, ad-Daruqutni)
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
  },
  header: {
    padding: 20,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    position: "relative",
  },
  mosqueName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  address: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  settingsButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  prayerSchedule: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  digitalClock: {
    alignItems: "center",
    marginBottom: 20,
  },
  clockText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  scheduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scheduleItem: {
    width: "18%",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 5,
  },
  prayerName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  prayerTime: {
    fontSize: 12,
    marginTop: 5,
  },
  hadithContainer: {
    backgroundColor: "#2E7D32",
    padding: 15,
  },
  hadithText: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
