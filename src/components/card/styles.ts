import { Platform, StyleSheet } from 'react-native';

const fontMono = Platform.OS === 'ios' ? 'Courier New' : 'monospace';
export const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 22,
    marginBottom: 8,
    borderRadius: 10
  },
  content: {
    flex: 1,
    padding: 22,
  },
  destaque: {
    fontFamily:  fontMono,
    fontSize: 20,
    lineHeight: 22,
    color: '#3D434D',
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 15,
    lineHeight: 18,
    color: '#3D434D',
    fontWeight: 'bold',
  },
  text: {
    color: '#888D97',
    fontSize: 13,
  },
  user: {
    color: '#888D97',
    fontSize: 13,
  },
  password: {
    color: '#1967FB',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    height: 80,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  }
});
