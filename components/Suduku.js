import React from 'react';
import { observer } from 'mobx-react/native'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch} from 'react-native';
import { Table, Rows, Cell, TableWrapper} from 'react-native-table-component';

@observer
export default class Suduku extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "Solve",
            advanced: false
        }
    }

    solve(e) {
        this.props.store.solve(this.state.advanced)
            .then((res) => {
                this.setState({
                    status: 'Solved'
                });
                alert(res.message)
            })
            .catch((res) => {
                this.setState({
                    status: 'Solved'
                });
                alert(res.message)
            })
    }

    reset(e) {
        this.setState({
            status: 'Solve'
        });
        this.props.store.reset()
    }

    change(e) {
        this.setState({
           status: 'Solve'
        });
        this.props.store.change();
    }

    useAdvanced(e) {
        this.setState((prevState) => ({
            advanced: !prevState.advanced
        }))
    }

    render() {
        return (
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={ styles.center }>
                        <Text style={ styles.header }>
                            Suduku
                        </Text>
                    </View>
                    <View>
                        <Table borderStyle={{ borderColor: '#add620' }}>
                            {
                                this.props.store.data.map((rowData, rowIndex) => {
                                    return (
                                        <TableWrapper key={rowIndex} style={styles.wrapper}>
                                            {
                                                ((rowData.map((cellData, cellIndex) => {
                                                    let style = [];
                                                    if(cellIndex % 3 === 0) {
                                                        style.push({borderLeftWidth: 2.5})
                                                    }
                                                    if(rowIndex % 3 === 0) {
                                                        style.push({borderTopWidth: 2.5})
                                                    }
                                                    if(cellIndex === 8) {
                                                        style.push({borderRightWidth: 2.5})
                                                    }
                                                    if(rowIndex === 8) {
                                                        style.push({borderBottomWidth: 2.5})
                                                    }
                                                    if(cellData === 0) {
                                                        style.push(styles.empty)
                                                    } else {
                                                        style.push(styles.solved)
                                                    }
                                                    return (<Cell key={cellIndex}
                                                                  data={cellData === 0 ? '' : cellData}
                                                                  style={style}
                                                                  textStyle={styles.text}/>)
                                                })))
                                            }
                                        </TableWrapper>
                                    )
                                })
                            }
                            {/*<Rows data={this.props.store.data} textStyle={styles.text}/>*/}
                        </Table>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <Text style={styles.text}>Advanced?</Text>
                            <Switch value={this.state.advanced} onValueChange={this.useAdvanced.bind(this)} />
                        </View>
                    </View>
                    <View style={ styles.center }>
                        <TouchableOpacity style={[styles.btn, {opacity: this.state.status === 'Solved' ? 0.3 : 1}]}
                                          onPress={this.solve.bind(this)}
                                          disabled={this.state.status === 'Solved'}>
                            <Text style={styles.btnText}>{ this.state.status }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {
                                                                backgroundColor: '#d60a11',
                                                                opacity: this.state.status === 'Solve' ? 0.3 : 1
                                                               }]}
                                          onPress={this.reset.bind(this)}
                                          disabled={this.state.status === 'Solve'}>
                            <Text style={styles.btnText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.center }>
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
    center: {
        alignItems: 'center'
    },
    wrapper: { flexDirection: 'row' },
    solved: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    empty: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    boldHorizontal: {
        borderLeftWidth: 2.5
    },
    boldVertical: {
        borderTopWidth: 2.5
    },
    boldRight: {
        borderRightWidth: 2.5
    },
    boldBottom: {
        borderBottomWidth: 2.5
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
    btnText: {
        color: '#fff',
        fontFamily: 'Times'
    }

});