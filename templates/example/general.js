module.exports = [
  {
    name: () => `App.tsx`,
    content: ({ className, moduleName }) => `import React from 'react'
import { withNavigationItem } from 'hybrid-navigation'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { lib } from '${moduleName}'

function App() {
  function handlePress() {
    console.log('You have pressed me.')
    console.log(lib(8, 9))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello World!</Text>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.2} style={styles.button}>
        <Text style={styles.buttonText}>press me</Text>
      </TouchableOpacity>
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: '${className} 演示',
  },
})(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  buttonText: {
    backgroundColor: 'transparent',
    color: 'rgb(34,88,220)',
  },

  welcome: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center',
    margin: 8,
  },
})
`,
  },
  {
    name: () => 'index.js',
    content: ({ className }) => `import { Platform } from 'react-native'
import { ReactRegistry, Navigator, Garden, BarStyleDarkContent } from 'hybrid-navigation'
import App from './App'

Garden.setStyle({
  screenBackgroundColor: '#F8F8F8',
  topBarStyle: BarStyleDarkContent,
  statusBarColorAndroid: Platform.Version > 21 ? undefined : '#4A4A4A',
})

ReactRegistry.startRegisterComponent()
ReactRegistry.registerComponent('${className}', () => App)
ReactRegistry.endRegisterComponent()

Navigator.setRoot({
  stack: {
    children: [
      {
        screen: {
          moduleName: '${className}',
        },
      },
    ],
  },
})
`,
  },
]
