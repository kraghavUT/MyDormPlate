import { View, Text } from 'react-native'
import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'


const MenuLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name = "J2-Menu"
          options = {{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = "Kins-Menu"
          options = {{
            headerShown: false
            
          }}
        />
        
        <Stack.Screen
          name = "JCL-Menu"
          options = {{
            headerShown: false
            
          }}
        />

      </Stack>

      <StatusBar backgroundColor= "#161622" style = "light"/>

    </>
  )
}

export default MenuLayout