import { useState } from 'react'; 
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from '../src/styles';
import { createUserWithEmailAndPassword } from  'firebase/auth';
import { auth } from '../src/Firebase.config';
import { useRouter } from "expo-router";



export default function NewUser(){
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userRePass, setUserRePass] = useState('');
    const router = useRouter();


    function newUser(){
        if(userMail === '' || userPass === '' || userRePass === ''){
            alert('Todos os campos devem ser preenchidos')
            return;
        }
        if(userPass !== userRePass ){
            alert('A senha e confirmação não são iguais')
            return;
        } else {
            createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((userCredencial) => {
                const user = userCredencial.user;
                alert('O usuário ' + userMail + ' foi criado. Faça o login');
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                router.replace('/');
            });
        }
        
    }

    return(
        <View style={styles.container}>
            <Image 
                source={require('../assets/iconeCadastroUsuario5.png')} // Substitua pelo caminho da sua imagem
                style={{ width: 500, height: 150, marginBottom: 30 }} // Ajuste o tamanho conforme necessário
                resizeMode="contain"
             />
            <Text style={styles.formTitle}>NOVO USUÁRIO</Text>
            <TextInput
                style={styles.formImput}
                placeholder="E-mail de usuário"
                keyboardType="email.address"
                autoCapitalize="none"
                autoComplete="email"
                value={userMail}
                onChangeText={setUserMail}
            />
            <TextInput
                style={styles.formImput}
                placeholder="Senha de usuário"
                autoCapitalize="none"
                secureTextEntry
                value={userPass}
                onChangeText={setUserPass}
            />
             <TextInput
                style={styles.formImput}
                placeholder="Repita a senha"
                autoCapitalize="none"
                secureTextEntry
                value={userRePass}
                onChangeText={setUserRePass}
            />
            <Pressable style={styles.formButton} onPress={newUser}>
                <Text style={styles.textButton}>
                    Cadastrar
                </Text>
            </Pressable>
            <View style={styles.subContainer}>
                <Pressable style={styles.subButton} onPress={() => router.push("/")}>
                   <Text style={styles.subTextButton}>Voltar</Text>
                </Pressable>
            </View>

        </View>
    );
}



