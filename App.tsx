import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();

function EditarPerfil({ route, navigation }: any) {
  const { nome, senha, id, sala, email, profileImage } = route.params || {};
  const [newNome, setNewNome] = useState(nome || '');
  const [newSenha, setNewSenha] = useState(senha || '');
  const [newID, setNewID] = useState(id || '');
  const [newSala, setNewSala] = useState(sala || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [newProfileImage, setNewProfileImage] = useState(profileImage || '');

  // Função para escolher imagem
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    navigation.navigate('VisualizarPerfil', {
      nome: newNome,
      senha: newSenha,
      id: newID,
      sala: newSala,
      email: newEmail,
      profileImage: newProfileImage,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      
      {/* Imagem de Perfil - Clique para alterar */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={{ uri: newProfileImage || 'https://randomuser.me/api/portraits/women/68.jpg' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Campo de Nome */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={newNome}
          onChangeText={setNewNome}
        />
      </View>

      {/* Campo de ID */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={newID}
          onChangeText={setNewID}
        />
      </View>

      {/* Campo de Sala */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sala</Text>
        <TextInput
          style={styles.input}
          value={newSala}
          onChangeText={setNewSala}
        />
      </View>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={newSenha}
          onChangeText={setNewSenha}
          secureTextEntry
        />
      </View>

      {/* Botão de Salvar */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

function VisualizarPerfil({ route, navigation }: any) {
  const { nome, senha, id, sala, email, profileImage } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualizar Perfil</Text>
      
      {/* Imagem de Perfil */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: profileImage || 'https://randomuser.me/api/portraits/women/68.jpg' }}
          style={styles.avatar}
        />
      </View>

      {/* Campo de Nome */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome || 'N/A'}
          editable={false} // Desativar edição
        />
      </View>

      {/* Campo de ID */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={id || 'N/A'}
          editable={false} // Desativar edição
        />
      </View>

      {/* Campo de Sala */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sala</Text>
        <TextInput
          style={styles.input}
          value={sala || 'N/A'}
          editable={false} // Desativar edição
        />
      </View>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email || 'N/A'}
          editable={false} // Desativar edição
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha ? '************' : 'N/A'}
          secureTextEntry
          editable={false} // Desativar edição
        />
      </View>

      {/* Botão de Editar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarPerfil', { nome, senha, id, sala, email, profileImage })}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VisualizarPerfil">
        <Stack.Screen name="VisualizarPerfil" component={VisualizarPerfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#f4f4f4',
    padding: 9, // 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14, // 
    color: '#333',
  },
  
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  inputContainer: {
    width: '95%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#B22222',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
