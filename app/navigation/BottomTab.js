import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeScreen from "../screens/Home";
import ExploreScreen from "../screens/Explore";
import FavoritesScreen from "../screens/Favorites";
import ProfileScreen from "../screens/Profile";
// import Icon from "react-native-vector-icons/"
import Icon from 'react-native-vector-icons/Octicons';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../theme/ThemeContext';


const Tab = createBottomTabNavigator();

export default function BottomTabs(){
    const { t } = useTranslation();
    const { dark, setDark, theme } = useContext(ThemeContext);

    return(
        <Tab.Navigator 
            // initialRouteName="Home"
             screenOptions={{
                tabBarActiveTintColor: theme.text,
                tabBarInactiveTintColor: 'lightgray',
                tabBarStyle: {
                backgroundColor:  theme.background,
                height: Platform.OS === 'ios' ? hp('10%') : hp('9%'),
                paddingTop: hp('0.5%'),
                borderTopColor: theme.text,
                borderTopWidth: 0.75,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                // headerShown: false
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="home"
                            size={hp('3%')}
                            color={focused ? theme.text : 'lightgray'}
                        />
                    ),
                    title: t('home'),
                }}
            />
            <Tab.Screen 
                name="Explore" 
                component={ExploreScreen} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="search"
                            size={hp('3%')}
                            color={focused ? theme.text : 'lightgray'}
                        />
                    ),
                    title: t('explore'),
                }}
            />
            <Tab.Screen 
                name="Favorites" 
                component={FavoritesScreen} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="heart-fill"
                            size={hp('3%')}
                            color={focused ? theme.text : 'lightgray'}
                        />
                    ),
                    title: t('favorites')
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="feed-person"
                            size={hp('3%')}
                            color={focused ? theme.text : 'lightgray'}
                        />
                    ),
                    title: t('profile')
                }}
            />
        </Tab.Navigator>
    )
}