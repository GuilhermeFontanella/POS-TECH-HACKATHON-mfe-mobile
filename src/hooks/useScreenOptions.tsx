import React from 'react';
import {TouchableOpacity} from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {useData} from './useData';
import {useTranslation} from './useTranslation';
import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import Block from '../components/Block';
import {usePomodoroModal} from "../context/PomodoroModalContext";
import PomodoroModal from '../components/PomodoroModal';

export default () => {
  const navigation = useNavigation();
  const {icons, colors, gradients, sizes} = useTheme();
  const {open} = usePomodoroModal();

  const menu = {
    headerStyle: {elevation: 0},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.sm},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}: any) => (
      <Text p>{children}</Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{marginRight: sizes.sm}}
          onPress={open}>
          <Image source={icons.bell} radius={0} color={colors.icon} />
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}>
          <Image source={icons.users} radius={0} color={colors.icon} />
        </TouchableOpacity>
      </Block>
    ),
  } as any;

  const options = {
    stack: menu
  };

  return options;
};
