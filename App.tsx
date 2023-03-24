import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View, AppRegistry, SafeAreaView, ScrollView } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


import { name as appName } from './app.json';
import ErrorBoundry from './src/components/ErrorBoundry/ErrorBoundry';
import FormBuilder from './src/components/FormBuilder/FormBuilder';
import { FormKYC } from './src/forms/FormKYC';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

const App = () => (
  
  <ErrorBoundry>
   
          <PaperProvider>
          <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
            <FormBuilder formDetail={FormKYC}/>
            </ScrollView>
            </SafeAreaView>
          </PaperProvider>

  </ErrorBoundry>
);
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

export default App;
