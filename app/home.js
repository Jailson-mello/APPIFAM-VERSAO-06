import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Switch } from 'react-native'; // Adicionado o Switch para o toggle de tema
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItemList } from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker'; // Importa o ImagePicker
import User from "../assets/user02.jpg"; // Imagem padrão
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import RelatorioScreen from "../screens/RelatorioScreen";
import Cardapio from "../screens/Cardapio";
import SobreApp from "../screens/SobreApp";
import ExtratoRI from "../screens/ExtratoRI";
import eCarteira from "../screens/eCarteira";
import Avaliacao from "../screens/Avaliacao";
import Agendar from "../screens/Agendar";
import Inicio from "../screens/Inicio";
import { auth } from '../src/Firebase.config';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

const Drawer = createDrawerNavigator();

export default function Home() {
  const [profileImage, setProfileImage] = useState(User); // Estado para a imagem do perfil
  const currentUser = auth.currentUser;
  const router = useRouter();
  
  // Estado para o tema (true para escuro, false para claro)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Carrega a imagem do perfil quando o componente é montado
  useEffect(() => {
    loadProfileImage();
  }, []);

  // Carrega a imagem do AsyncStorage
  const loadProfileImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage) {
        setProfileImage(storedImage); // Atualiza a imagem do perfil com a imagem armazenada
      }
    } catch (error) {
      console.error('Erro ao carregar a imagem do perfil:', error);
    }
  };

  // Salva a imagem no AsyncStorage
  const saveProfileImage = async (uri) => {
    try {
      await AsyncStorage.setItem('profileImage', uri);
    } catch (error) {
      console.error('Erro ao salvar a imagem do perfil:', error);
    }
  };

  // Verifica se o usuário está logado
  useEffect(() => {
    if (!currentUser) {
      alert('É necessário estar logado para utilizar este recurso!');
      router.replace('/');
    }
  }, [currentUser]);

  // Abre o seletor de imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a galeria!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri); // Atualiza a imagem do perfil
      saveProfileImage(uri); // Salva a nova imagem no AsyncStorage
    }
  };

  // Função para logout do usuário
  const logout = async () => {
    try {
      await signOut(auth);
      alert("Você desconectou-se do sistema!");
      router.replace('/');
    } catch (error) {
      alert(error.message);
    }
  };

  // Alterna o estado do tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SafeAreaView style={styles.drawerContent}>
          

          {/**CORRIGINDO O ERRO DE EXBIÇÃO DE IMAGEM NESSE ESPAÇO*/}
          <View style={styles.profileContainer}>
            <Pressable onPress={pickImage} style={styles.profileImageContainer}>
              <Image 
                source={profileImage}
                style={styles.profileImage}
              />
              <MaterialIcons name="camera-alt" size={24} color="#fff" style={styles.cameraIcon} />
            </Pressable>
            {/**<Text style={styles.profileName}>{currentUser?.email || 'Nome não disponível'}</Text> */}
            <Text style={styles.profileEmail}>{currentUser?.email || 'E-mail não disponível'}</Text>
          </View>

      
          <View style={styles.themeToggleContainer}>
            <Text style={styles.themeToggleText}>
             {/** {isDah"rkTheme ? "Tema Escuro" : "Tema Claro"} */}
            </Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>

          <DrawerItemList {...props} />
          <Pressable style={styles.logoutButton} onPress={logout}>
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </Pressable>
        </SafeAreaView>
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDarkTheme ? "#333" : "#fff", // Altera a cor do Drawer com base no tema
          width: 250,
        },
        headerStyle: {
          backgroundColor: isDarkTheme ? "#40E0D0" : "white", // Altera a cor do header com base no tema
          height: 70, // Ajuste a altura conforme necessário
        
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: isDarkTheme ? "lightblue" : "blue",
        drawerLabelStyle: {
          color: isDarkTheme ? "#fff" : "#111",
        },
      }}
    >
      <Drawer.Screen
        name="Início"
        component={Inicio}
        options={{
          drawerLabel: "Início",
          title: "Início",
          drawerIcon: () => (
            <MaterialIcons name="home" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Cardapio"
        component={Cardapio}
        options={{
          drawerLabel: "Cardápio",
          title: "Cardápio",
          drawerIcon: () => (
            <MaterialIcons name="menu-book" size={25} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="ExtratoRI"
        component={ExtratoRI}
        options={{
          drawerLabel: "Extrato RI",
          title: "Extrato RI",
          drawerIcon: () => (
            <MaterialIcons name="attach-money" size={30} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Agendar"
        component={Agendar}
        options={{
          drawerLabel: "Agendar",
          title: "Agendar",
          drawerIcon: () => (
            <MaterialIcons name="calendar-today" size={25} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="e-Carteira"
        component={eCarteira}
        options={{
          drawerLabel: "e-Carteira",
          title: "e-Carteira",
          drawerIcon: () => (
            <MaterialIcons name="credit-card" size={25} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Avaliação"
        component={Avaliacao}
        options={{
          drawerLabel: "Avaliação",
          title: "Avaliação",
          drawerIcon: () => (
            <MaterialIcons name="star" size={25} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Sobre o App"
        component={SobreApp}
        options={{
          drawerLabel: "Sobre o App",
          title: "Sobre o App",
          drawerIcon: () => (
            <MaterialIcons name="info" size={25} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="RelatorioScreen"
        component={RelatorioScreen}
        options={{
          drawerLabel: "Relatório avaliação",
          title: "Relatório avaliação",
          drawerIcon: () => (
            <MaterialIcons name="assessment" size={25} color="#808080" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'flex-start', // Mantenha o conteúdo do drawer no início
  },
  profileContainer: {
    height: 100,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "rgba(0, 0, 0, 0)808080", //TRANSPARENTE
    borderBottomWidth: 1,
    marginBottom: 20, // Mantenha esta margem para dar espaço ao conteúdo abaixo
    marginTop: 24, // Aumente este valor para descer mais o componente
  },
  profileImageContainer: {
    position: 'relative',
    borderColor: 'lightgray', // Cor da borda
    borderWidth: 3, // Largura da borda
    borderRadius: 65, // Para fazer a borda circular
    overflow: 'hidden', // Para garantir que a borda siga a forma circular
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
    
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  profileName: {
    fontSize: 22,
    marginVertical: 6,
    fontWeight: "bold",
    color: "#111",
  },
  profileEmail: {
    fontSize: 16,
    color: "#111",
  },
  logoutButton: {
    flexDirection: 'row', // Alinha o ícone e o texto horizontalmente
    alignItems: 'center', // Alinha o ícone e o texto verticalmente
    margin: 3,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#40E0D0',
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'center'
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff', // cor do texto
    marginLeft: 10 // Espaço entre o ícone e o texto
   
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    marginTop:8,
  },
  themeToggleText: {
    fontSize: 16,
    color: '#111',
  },
});

 
