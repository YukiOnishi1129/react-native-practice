import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Main</Text>
    </View>
  )
}

const Sub = () => {
  return (
    <View style={styles.container}>
      <Text>Sub</Text>
    </View>
  )
}
// インスタンスを生成し、ルーティングを定義
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Sub" component={Sub} />
    </Tab.Navigator>
  )
}

export default function Index() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}
