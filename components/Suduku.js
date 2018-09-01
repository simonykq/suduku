import React from 'react';
import { observer } from 'mobx-react/native'
import { StyleSheet, View, Text, ScrollView, Button, TouchableOpacity} from 'react-native';
import { Table, Rows, Cell, TableWrapper} from 'react-native-table-component';

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

    reset(e) {
        this.props.store.reset()
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
                    <View style={{ alignItems: 'center' }}>
                        <Text style={ styles.header }>
                            Suduku
                        </Text>
                    </View>
                    <View>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#add620'}}>
                            {
                                this.props.store.data.map((rowData, rowIndex) => {
                                    return (
                                        <TableWrapper key={rowIndex} style={styles.wrapper}>
                                            {
                                                ((rowData.map((cellData, cellIndex) => {
                                                    return (<Cell key={cellIndex}
                                                                  data={cellData === 0 ? '' : cellData}
                                                                  style={cellData === 0 ? styles.empty : styles.solved}
                                                                  textStyle={styles.text}/>)
                                                })))
                                            }
                                        </TableWrapper>
                                    )
                                })
                            }
                            {/*<Rows data={this.props.store.data} textStyle={styles.text}/>*/}
                        </Table>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btn} onPress={this.solve.bind(this)}>
                            <Text style={styles.btnText}>{ this.state.status }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDanger} onPress={this.reset.bind(this)}>
                            <Text style={styles.btnText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btn} onPress={this.change.bind(this)}>
                            <Text style={styles.btnText}>Try Another</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly'
    },
    header: {
        fontSize: 20,
        color: '#add620',
        fontWeight: 'bold',
        fontFamily: 'Cochin'
    },
    // table: {
    //     width: 100,
    //     borderWidth: 2,
    //     borderColor: '#add620'
    // },
    wrapper: { flexDirection: 'row' },
    solved: {
        width: '11.2%',
        backgroundColor: '#f0f0f0'
    },
    emply: {
        width: '11.2%',
        backgroundColor: '#fff'
    },
    text: {
        margin: 6,
        textAlign: 'center',
        fontFamily: 'Times'
    },
    btn: {
        width: "80%",
        height: 30,
        marginBottom: 5,
        backgroundColor: '#add620',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDanger: {
        width: "80%",
        height: 30,
        marginBottom: 5,
        backgroundColor: '#d60a11',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontFamily: 'Times'
    }

});