import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  button: {
    backgroundColor: '#FFDA00',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    fontSize: 30,
  },
  imagen: {
    height: 300,
    width: '100%',
  },
  amount: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default globalStyles;
