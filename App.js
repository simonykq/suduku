import 'es6-symbol/implement';
import React from 'react';
import Suduku from './components/Suduku';
import { Navigator } from 'react-native-deprecated-custom-components';
import dataStore from './stores/DataStore';



export default class App extends React.Component {

    renderScene (route, navigator) {
        return <route.component {...route.passProps} navigator={navigator} />
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                initialRoute={{
                    component: Suduku,
                    passProps: {
                        store: dataStore
                    }
                }} />
        );
    }
}