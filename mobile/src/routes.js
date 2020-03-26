// Dependencies imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

// Pages imports
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
  return(
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{headerShown:false}}>
        {/* Componnents are the pages created at repository ./pages */}
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Detail" component={Detail}/>
      </AppStack.Navigator>

    </NavigationContainer>
  );
}