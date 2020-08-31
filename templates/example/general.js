module.exports = [
  {
    name: () => `App.tsx`,
    content: ({ className, moduleName }) => `import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { lib } from '${moduleName}'

interface Props {}

export default class App extends Component {
  static navigationItem = {
    titleItem: {
      title: '${className} 演示',
    },
  }

  constructor(props: Props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    console.log('You have pressed me.')
    console.log(lib(8, 9))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello World!</Text>

        <TouchableOpacity onPress={this.handlePress} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>press me</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

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
    content: ({ className }) => `import {
  ReactRegistry,
  Navigator,
  Garden,
  BarStyleDarkContent,
} from 'react-native-navigation-hybrid'
import App from './App'

Garden.setStyle({
  screenBackgroundColor: '#F8F8F8',
  topBarStyle: BarStyleDarkContent,
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
