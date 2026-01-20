// import React, { useContext } from 'react';
// import { View, Text, Button, TouchableOpacity } from 'react-native';


// export default function ProfileScreen() {
//   const { i18n, t } = useTranslation();
//     const { dark, setDark, theme } = useContext(ThemeContext);

//   const toggleLanguage = () => {
//     const nextLang = i18n.language === 'en' ? 'de' : 'en';
//     i18n.changeLanguage(nextLang);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{color: theme.text }} >{t('profile')}</Text>
//       <Button title="Change Language" onPress={toggleLanguage} />
//       <Button title="Toggle Theme" onPress={() => setDark(!dark)} />
//     </View>
//   );
// }

// import React, { useContext } from 'react';
// import { View, Text, Switch, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { ThemeContext } from '../../theme/ThemeContext';

// export default function ProfileScreen() {
//   const { i18n, t } = useTranslation();
//     const { dark, setDark, theme } = useContext(ThemeContext);

//   const isGerman = i18n.language === 'de';

//   const onToggleLanguage = () => {
//     i18n.changeLanguage(isGerman ? 'en' : 'de');
//   };

//   return (
//     <View style={[styles.container, {backgroundColor: theme.background}]}>
//       <Text style={{color: theme.text }} >{t('profile')}</Text>

//       <View style={styles.row}>
//         <Text style={[styles.label, {color: theme.text}]}>{ isGerman ? `${t('german')}` : `${t('english')}`}</Text>
//         <Switch
//           value={isGerman}
//           onValueChange={onToggleLanguage}
//         />
//       </View>

//       <View style={styles.row}>
//         <Text style={[styles.label, {color: theme.text}]}>dark theme</Text>
//         <Switch
//           value={dark}
//           onValueChange={()=> setDark(!dark)}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 30,
//     alignSelf: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 16,
//   },
// });


import React, { useContext } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import ProfileOption from '../../components/ProfileOption';
import styles from './styles';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Profile({
  isDark,
  toggleTheme,
  language,
  toggleLanguage,
}) {
  const navigation = useNavigation();
  const { i18n, t } = useTranslation();
  const { dark, setDark, theme } = useContext(ThemeContext);
  const { logout, user } = useContext(AuthContext);

  const isGerman = i18n.language === 'de';

  const onToggleLanguage = () => {
    i18n.changeLanguage(isGerman ? 'en' : 'de');
  };


  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]} showsVerticalScrollIndicator={false}>
      {/* User Card */}
      <View style={styles.userCard}>
        {
          user ?
          <>
            <Text style={styles.name}>{user.user.name}</Text>
            <Text style={styles.email}>{user.user.email}</Text>
          </>
          :
         <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('Login')} >
            <Text style={styles.loginText}>Login First</Text>
          </TouchableOpacity>
        }
      </View>

      {/* Personalization */}
      <Text style={styles.section}>Personalization</Text>

      <ProfileOption
        title="Appearance"
        subtitle="Light / Dark theme"
        rightComponent={
          <Switch
            value={dark}
            onValueChange={() => setDark(!dark)}
          />
        }
      />

      <ProfileOption
        title="Language"
        subtitle={isGerman ? 'English 🇬🇧' : 'Deutsch 🇩🇪'}
        rightComponent={
          <Switch
            value={isGerman}
            onValueChange={onToggleLanguage}
          />
        }
      />

      {/* Legal */}
      <Text style={styles.section}>Legal</Text>

      <ProfileOption title="Privacy Policy" onPress={() => { }} />
      <ProfileOption title="Terms & Conditions" onPress={() => { }} />
        <ProfileOption title="Log out" onPress={logout} />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>Version 0.0.1</Text>
        <Text style={styles.powered}>Powered by @FarooqAlam</Text>
      </View>
    </ScrollView>
  );
}

