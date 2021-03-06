import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  icon: {
    fontSize: 30,
  },
  nameAlive: {
    fontSize: 22,
  },
  nameDead: {
    color: 'darkred',
    fontSize: 22,
  },
  roleAlive: {
    fontSize: 17,
  },
  roleDead: {
    fontSize: 17,
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },
  footer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});
