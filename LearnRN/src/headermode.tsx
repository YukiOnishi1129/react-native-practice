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
          navigate('Sub', {
            title: `${Date.now()}`,
          })
        }}>
        <Text>go to sub</Text>
      </TouchableOpacity>
    </View>
  )
}

const Sub = () => {
  return (
    <View style={styles.container}>
      <Text>Sign up or login</Text>
    </View>
  )
}

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    //   headerMode="none"でヘッダーが消える
    <Stack.Navigator headerMode="float">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Sub" component={Sub} />
    </Stack.Navigator>
  )
}

export default function () {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
