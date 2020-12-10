import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const Main = () => {
  // dispatchメソッドを取得
  const {dispatch} = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Main</Text>
      {/* dispatchメソッドでDrawerを開く */}
      <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())}>
        <Text>open drawer</Text>
      </TouchableOpacity>
    </View>
  )
}

const Sub = () => {
  const {dispatch} = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Sub</Text>
      <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())}>
        <Text>open drawer</Text>
      </TouchableOpacity>
    </View>
  )
}
// インスタンスを生成し、ルーティングを定義
const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Sub" component={Sub} />
    </Drawer.Navigator>
  )
}

export default function Index() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}
