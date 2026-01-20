import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "../navigation/RootStack";
import { ThemeProvider } from '../theme/ThemeContext';
import '../i18n/i18n';
import { StatusBar } from 'react-native';
import { AuthProvider } from '../context/AuthContext';

export default function App(){
    return(
        <AuthProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <StatusBar barStyle={'dark-content'} />
                    <RootStack />
                </NavigationContainer>
            </ThemeProvider>
        </AuthProvider>
    )
}
