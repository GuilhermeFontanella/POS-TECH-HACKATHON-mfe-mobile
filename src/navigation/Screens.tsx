import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Home, Settings }  from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{title: t('navigation.settings')}}
      />

    </Stack.Navigator>
  );
};
