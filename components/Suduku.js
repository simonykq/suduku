import React from 'react';
import { observer } from 'mobx-react/native'
import { StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import { Table, Rows } from 'react-native-table-component';

@observer
export default class Suduku extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "Solve"
        }
    }

    solve(e) {
        this.setState({
            status: 'Solving'
        }, () => {
            this.props.store.solve()
                .then((message) => {
                    this.setState({
                        status: 'Solved'
                    });
                    alert(message)
                })
                .catch((message) => {
                    this.setState({
                        status: 'Unsolved'
                    });
                    alert(message)
                })
        });
    }

    change(e) {
        this.setState({
           status: 'Solve'
        });
        this.props.store.change();
    }

    render() {
        return (
                <ScrollView contentContainerStyle={styles.container}>
                    <View>
                        <Text style={styles.header}>
                            Suduku
                        </Text>
                    </View>
                    <View>
                        <Table borderStyle={styles.table}>
                            <Rows data={this.props.store.data} textStyle={styles.text}/>
                        </Table>
                    </View>
                    <View style={{textAlign: 'center'}}>
                        <Button title={ this.state.status }
                                onPress={this.solve.bind(this)} />
                        <Button title="Try Another"
                                onPress={this.change.bind(this)} />
                    </View>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        textAlign: 'center'
    },
    header: {
        fontFamily: 'Cochin',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    table: {
        width: 100,
        borderWidth: 2,
        borderColor: '#c8e1ff',
    },
    text: {
        margin: 6,
        textAlign: 'center'
    }
});