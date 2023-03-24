import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#211D1D',
      // backgroundColor: '#2C3639',
      
      // opacity: ,
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#F8F8F8'
    },

    input: {
      width: '80%',
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },

    button: {
      width: '80%',
      backgroundColor: '#2196F3',
      color: '#FFF',
      padding: 10,
      borderRadius: 5,
    },

    text: {
      color: '#F8F8F8',
    },

    textOpa: {

    }
  });

export default styles;