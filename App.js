import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function PantallaInicio ({navigation}){

  const LISTADOCAT = [
    {
      id: '0f3559d4-d16b-45f8-9859-e8baff32c6d5',
      title: 'Deportes',
    },
    {
      id: '1fdff041-b1ef-47f4-aa91-5a2522bf4498',
      title: 'Colectivo',
    },
    {
      id: '781a0645-6c63-46fc-be87-b81018bf8b55',
      title: 'Congresos, conferencias y festivales',
    },
    {
      id: '587b2815-4c8d-4bac-9442-c0c9147136fc',
      title: 'Cursos y talleres',
    },
    {
      id: '043036db-9a19-4a0f-91d5-732cfb2c1532',
      title: 'Espectaculos',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Ferias, Exposiciones y Museos',
    },
    {
      id: 'b3fb171d-a2d9-4266-b055-7acf206d9439',
      title: 'Fiestas populares',
    },
    {
      id: '9a6de506-6835-4636-80db-30f29bc1c6c1',
      title: 'Hechos de Vida',
    },
    {
      id: '1d497756-35b7-44d5-bc13-dd82e62f5ec0',
      title: 'Música',
    },
    {
      id: '1d497756-35b7-44d5-bc13-dd82e62f5ec1',
      title: 'Perfiles',
    },
    {
      id: '3de3132e-f727-431d-bd65-722d39f3aacf',
      title: 'Premios y concursos',
    },
    {
      id: 'be13814c-290d-43a1-b10f-4aeb31b774b8',
      title: 'TemasWeb',
    },
    {
      id: '18fa1e73-6b1a-4e42-b48c-3002b1374fac',
      title: 'Viajes y excursiones',
    },
  ];
   /* Maqueto un item del listado */
   const renderItem = ({item, index}) => {
    return(

        <View style={styles.item}>
          <View>
            <Text style={styles.itemtitulo}>{item.title}</Text>
          </View>
          <View style={styles.itemcontainerbotones}>
            <TouchableOpacity 
            style={styles.botones}         
            onPress={() => navigation.navigate('Categoría', item.title)}>
            <Text style={styles.botonestexto}>Ver Actividades</Text></TouchableOpacity>
          </View>
        </View>

       )

  }


  return(
    
  <View style={{ flex: 1, padding: 24 }}>
    
    <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>Todas las categorías</Text>
        <FlatList
          data={LISTADOCAT}
          keyExtractor={item => item.id.toString()} //Debe ser un string
          renderItem={renderItem}
        />
      </View>
    
  </View>
  );

}

function PantallaCategorias({route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const idCategoria  = route.params;
  //console.log(idCategoria);

  useEffect(() => {
    fetch(`https://datosabiertos.malaga.eu/api/3/action/datastore_search?resource_id=6dc53e72-753d-4a84-a151-24fc135cd742&q={"CATEGORIA":"${idCategoria}"}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
     
  }, []);
  console.log(data);
 
  

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
        <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{idCategoria}</Text>
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


