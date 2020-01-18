import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

import { MaterialIcons } from '@expo/vector-icons';

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
    <>
      <MapView style={styles.mapStyle} initialRegion={currentRegion}>
        <Marker coordinate={{ latitude: -22.971795, longitude: -43.410666 }}>
          <Image
            source={{
              uri:
                'https://avatars3.githubusercontent.com/u/11803606?s=460&v=4',
              height: 45,
              width: 45
            }}
            style={styles.avatar}
          ></Image>
          <Callout
            style={styles.callout}
            onPress={() => {
              navigation.navigate('Profile', { github_username: 'leanfj' });
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
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  avatar: {
    borderRadius: 50
  },
  callout: {
    width: 200
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: { color: '#666', marginTop: 5 },
  devTechs: { marginTop: 5 },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    color: '#333',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 3
  },
  loadButton: {
    height: 50,
    width: 50,
    backgroundColor: '#7d40e7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
});
export default Main;
