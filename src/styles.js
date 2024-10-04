import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#40E0D0',
        margin: 10,      
    },
    formImput: {
        borderColor: '#40E0D0',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 22,
        width: '80%',
        padding: 10,
        margin: 10,
    },
    formButton:{
        backgroundColor: '#40E0D0',
        width: '80%',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    subButtom: {
        padding: 10,
    },
    subTextButton: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },

    //TELAS INTERNAS
    internalContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 25,
    },
    topBar: {
        flexDirection: 'row-reverse',
        padding: 10,
        backgroundColor: 'blueviolet',
        widht: '100%',
    },
    topBarButtonText: {
        color: 'white',
        fontSize: 20,
         fontWeight: '700',
    }
});

  

 

