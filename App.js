import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch('https://datosabiertos.malaga.eu/api/3/action/datastore_search?resource_id=6dc53e72-753d-4a84-a151-24fc135cd742')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
     
  }, []);



  return (
    <View style={{ flex: 1, padding: 24 }}>
    {isLoading ? <Text>Loading...</Text> : 
    ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.records_format}</Text>
        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
        <FlatList
          data={data.result.records}
          //keyExtractor={({ _id }, index) => _id}
          renderItem={({ item }) => (
            <Text>{item.NOMBRE}</Text>
          )}
        />
      </View>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
