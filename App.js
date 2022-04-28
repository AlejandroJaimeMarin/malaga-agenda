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
            <Text style={styles.botonestexto}>Ver Actividades</Text>
            </TouchableOpacity>
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
  const [data, setMasterDataSource] = useState([]);
  const idCategoria  = route.params;
  const currentTime = formatDate(new Date());
  //console.log(idCategoria);
  //`https://datosabiertos.malaga.eu/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20"6dc53e72-753d-4a84-a151-24fc135cd742"%20WHERE%20"CATEGORIA"%20LIKE%20${idCategoria}`
  //`https://datosabiertos.malaga.eu/api/3/action/datastore_search?resource_id=6dc53e72-753d-4a84-a151-24fc135cd742&q={"CATEGORIA":"${idCategoria}"}`
  useEffect(() => {
    fetch(`https://datosabiertos.malaga.eu/api/3/action/datastore_search?resource_id=9db3cc24-ebb3-4822-9371-fef0a4e05da0&q={"CATEGORIA":"${idCategoria}"}`)
      .then((response) => response.json())
      .then((json) => setMasterDataSource(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
     
  }, []);
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  
  if (isLoading == false){

    const filteredData = data.result.records.filter(x => x.F_INICIO > currentTime);
    console.log(filteredData);
    console.log(currentTime);
  }

   /* Maqueto un item del listado */
  const renderItem = ({item, index}) => {
      return(

          <View style={styles.item}>
            <View>
              <Text style={styles.itemtitulo}>{item.NOMBRE.replace(/(<([^>]+)>)/gi, "")}</Text>
              <Text>{item.DESCRIPCION.replace(/(<([^>]+)>)/gi, "")}</Text>
              <Text>{item.F_INICIO}</Text>
            </View>
            <View style={styles.itemcontainerbotones}>
              <TouchableOpacity 
              style={styles.botones} 
              onPress={() => navigation.navigate('Ficha', {titulo: item.NOMBRE, descripcion: item.DESCRIPCION, categoria: item.CATEGORIA, 
              finicio: item.F_INICIO, ffinal: item.F_FIN, telefono: item.TELEFONO, email: item.E_MAIL, web: item.DIRECCION_WEB, horario: item.HORARIO, 
              especialidad: item.ESPECIALIDAD, destinatarios: item.DESTINATARIOS_DESCRIPCION, direccion1: item.ID_LUGAR, direccion2: item.OTROS_LUGARES})}>
                <Text style={styles.botonestexto}>Saber más</Text>
              </TouchableOpacity>
            </View>
          </View>

         )

    }
    
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

function PantallaFicha({route, navigation }){

  const {titulo, descripcion, categoria, direccion1, direccion2, especialidad, destinatarios, finicio, ffinal, telefono, email, web, horario} = route.params;

  //Función para mostrar las fechas con un formato más legible
  let fechaParse = (fecha) => new Date (fecha).toString()

  let fechaInicio = fechaParse(finicio);
  let fechaFinal = fechaParse(ffinal)

  //const fecha = transformarFecha(finicio);

  
  return (
    <View>
      <Text>{titulo.replace(/(<([^>]+)>)/gi, "")}</Text>
      <Text>{descripcion.replace(/(<([^>]+)>)/gi, "")}</Text>
      <Text>{categoria}</Text>
      <Text>{direccion1}</Text>
      <Text>{direccion2}</Text>
      <Text>{especialidad}</Text>
      <Text>{destinatarios}</Text>
      <Text>{fechaInicio}</Text>
      <Text>{fechaFinal}</Text>
      <Text>{horario}</Text>
      <Text>{telefono}</Text>
      <Text>{email}</Text>
      <Text>{web}</Text>
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
        <Stack.Screen name="Ficha" component={PantallaFicha}/>
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


