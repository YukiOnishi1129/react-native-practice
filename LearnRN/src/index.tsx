import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {useNavigation, NavigationContainer} from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const Main = () => {
  const {navigate} = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Main</Text>
      <TouchableOpacity
        onPress={() => {
          // ここで画面遷移
          navigate('Sub')
        }}>
        <Text>go to sub</Text>
      </TouchableOpacity>
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

// createStackNavigatorで作成したインスタンスを用いてルーティングを定義
const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Sub" component={Sub} />
    </Stack.Navigator>
  )
}

const Index = () => {
  return (
    //   NavigationContainer:ルーティングを束ねておくコンテナ
    <NavigationContainer onStateChange={(newState) => console.log(newState)}>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default Index
