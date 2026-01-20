import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
  },

  userCard: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 6,
  },

  section: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },

  footer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  version: {
    fontSize: 12,
    color: '#777',
  },
  powered: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  loginButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 24,
  },

  loginText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
  },
});
