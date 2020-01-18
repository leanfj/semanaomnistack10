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

import api from '../services/api';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');

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

  async function loadDevelopers() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data.devs);
  }

  function handleChangeRegion(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleChangeRegion}
        style={styles.mapStyle}
        initialRegion={currentRegion}
      >
        {devs.map(dev => {
          return (
            <Marker
              key={dev._id}
              coordinate={{
                longitude: dev.location.coordinates[0],
                latitude: dev.location.coordinates[1]
              }}
            >
              <Image
                source={{
                  uri: dev.avatar_url,
                  height: 45,
                  width: 45
                }}
                style={styles.avatar}
              ></Image>
              <Callout
                style={styles.callout}
                onPress={() => {
                  navigation.navigate('Profile', {
                    github_username: dev.github_username
                  });
                }}
              >
                <View>
                  <Text style={styles.devName}>{dev.name}</Text>
                  <Text style={styles.devBio}>{dev.bio}</Text>
                  <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <TouchableOpacity onPress={loadDevelopers} style={styles.loadButton}>
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
