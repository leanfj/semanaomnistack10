import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <View>
      <MapView style={styles.mapStyle} initialRegion={currentRegion}>
        <Marker coordinate={{ latitude: -22.971795, longitude: -43.410666 }}>
          <Image
            source={{
              uri:
                "https://avatars3.githubusercontent.com/u/11803606?s=460&v=4",
              height: 45,
              width: 45
            }}
            style={styles.avatar}
          ></Image>
          <Callout
            style={styles.callout}
            onPress={() => {
              navigation.navigate("Profile", { github_username: "leanfj" });
            }}
          >
            <View>
              <Text style={styles.devName}>Leandro Ferreira</Text>
              <Text style={styles.devBio}>FullStack Developer</Text>
              <Text style={styles.devTechs}>ReactJs, NodeJs</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  avatar: {
    borderRadius: 50
  },
  callout: {
    width: 200
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: { color: "#666", marginTop: 5 },
  devTechs: { marginTop: 5 }
});
export default Main;
