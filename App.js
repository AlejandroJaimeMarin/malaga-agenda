import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function PantallaInicio ({navigation}){

  return(
    <Button
    title="Test"
    onPress={() => navigation.navigate('Categoría')}
  />
  );

}

function PantallaCategorias({route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const idCategoria  = route.params;
  

  useEffect(() => {
    fetch('https://datosabiertos.malaga.eu/api/3/action/datastore_search?resource_id=6dc53e72-753d-4a84-a151-24fc135cd742&q={"CATEGORIA":"Deportes"}')
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
    var arr = [{"time":"2016-07-26 09:02:27","type":"aa"}, {"time":"2016-04-21 20:35:07","type":"ae"}, {"time":"2016-08-20 03:31:57","type":"ar"}, {"time":"2017-01-19 22:58:06","type":"ae"}, {"time":"2016-08-28 10:19:27","type":"ae"}, {"time":"2016-12-06 10:36:22","type":"ar"}, {"time":"2016-07-09 12:14:03","type":"ar"}, {"time":"2016-10-25 05:05:37","type":"ae"}, {"time":"2016-06-05 07:57:18","type":"ae"}, {"time":"2016-10-08 22:03:03","type":"aa"}, {"time":"2016-08-13 21:27:37","type":"ae"}, {"time":"2016-04-09 07:36:16","type":"ar"}, {"time":"2016-12-30 17:20:08","type":"aa"}, {"time":"2016-03-11 17:31:46","type":"aa"}, {"time":"2016-05-04 14:08:25","type":"ar"}, {"time":"2016-11-29 05:21:02","type":"ar"}, {"time":"2016-03-08 05:46:01","type":"ar"}, ];
    var filtered = arr.filter(a => a.type == "ar");
    //console.log(data);
   //var filtered = data.filter(a => a.CATEGORIA == "Deportes");

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


const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={PantallaInicio} />
        <Stack.Screen name="Categoría" component={PantallaCategorias} />
      </Stack.Navigator>
    </NavigationContainer>
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


