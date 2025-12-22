import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, BooksList, BookDetails, BookForm, Settings } from '../screens';
import { useLanguage } from '../contexts/LanguageContext';
import { colors } from '../constants/theme';

export type RootStackParamList = {
  Home: undefined;
  Books: undefined;
  BookDetails: { bookId: string };
  AddBook: undefined;
  EditBook: { bookId: string };
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavigatorContent: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: t.nav.home }}
      />
      <Stack.Screen
        name="Books"
        component={BooksList}
        options={{ title: t.books.title }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{ title: `${t.books.title} Details` }}
      />
      <Stack.Screen
        name="AddBook"
        component={BookForm}
        options={{ title: t.books.addBook }}
      />
      <Stack.Screen
        name="EditBook"
        component={BookForm}
        options={{ title: t.books.editBook }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: locale === 'en' ? 'Settings' : 'الإعدادات' }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <NavigatorContent />
    </NavigationContainer>
  );
};
