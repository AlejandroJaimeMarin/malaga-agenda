import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
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

   /* Maqueto un item del listado */
  const renderItem = ({item, index}) => {
      return(

          <View style={styles.item}>
            <View>
              <Text style={styles.itemtitulo}>{item.NOMBRE.replace(/(<([^>]+)>)/gi, "")}</Text>
              <Text>{item.DESCRIPCION.replace(/(<([^>]+)>)/gi, "")}</Text>
              <Text style={styles.itemcategoria}>{item.CATEGORIA}</Text>
              <Text>{item.F_INICIO}</Text>
              <Text>{item.F_FIN}</Text>
              
            </View>
            <View style={styles.itemcontainerbotones}>
              <TouchableOpacity style={styles.botones} ><Text style={styles.botonestexto}>Saber más</Text></TouchableOpacity>
            </View>
          </View>

         )

    }

  return (
    <View style={{ flex: 1, padding: 24 }}>
    {isLoading ? <Text>Cargando...</Text> : 
    ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>Activadades</Text>
        <FlatList
          data={data.result.records}
          keyExtractor={item => item._id.toString()} //Debe ser un string
          renderItem={renderItem}
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#eceff1',
    borderRadius: 10,
    flex: 1,
    minWidth: '80%',
  },
  itemtitulo:{
    fontSize: 18,
    fontWeight: "bold",
  },
  itemcategoria: {
    fontWeight: "bold",
  },
  itemcontainerbotones: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
    width: '100%',
  },
  botones: {
    backgroundColor: '#ef5350',
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  botonestexto:{
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});
