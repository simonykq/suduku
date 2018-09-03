import React from 'react';
import { Font } from 'expo';
import { observer } from 'mobx-react/native'
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { Table, Cell, TableWrapper} from 'react-native-table-component';


let { width } = Dimensions.get('window');

console.log(width);

EStyleSheet.build({
    $rem: (width >= 1024) ? 20 : (width >= 375) ? 18 : 16,
    $primaryColor: '#60a628',
    $secondaryColor: '#d63739',
    $primaryFont: 'Cochin',
    $borderWidth: '0.15rem',

});

@observer
export default class Suduku extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "Solve",
            advanced: false,
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Cochin': require('../assets/fonts/Cochin.ttf'),
        });
        this.setState({ fontLoaded: true });
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
                this.state.fontLoaded ? (
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={ styles.center }>
                            <Text style={ styles.header }>
                                Suduku
                            </Text>
                        </View>
                        <View>
                            <Table borderStyle={{ borderColor: EStyleSheet.value('$primaryColor') }}>
                                {
                                    this.props.store.data.map((rowData, rowIndex) => {
                                        return (
                                            <TableWrapper key={rowIndex} style={styles.wrapper}>
                                                {
                                                    ((rowData.map((cellData, cellIndex) => {
                                                        let style = [styles.cell],
                                                            border = EStyleSheet.value('$borderWidth');
                                                        if(cellIndex % 3 === 0) {
                                                            style.push({borderLeftWidth: border})
                                                        }
                                                        if(rowIndex % 3 === 0) {
                                                            style.push({borderTopWidth: border})
                                                        }
                                                        if(cellIndex === 8) {
                                                            style.push({borderRightWidth: border})
                                                        }
                                                        if(rowIndex === 8) {
                                                            style.push({borderBottomWidth: border})
                                                        }
                                                        if(cellData === 0) {
                                                            style.push(styles.empty)
                                                        } else {
                                                            style.push(styles.solved)
                                                        }
                                                        return (<Cell key={cellIndex}
                                                                      data={cellData === 0 ? '' : cellData}
                                                                      style={style}
                                                                      textStyle={styles.cellText}/>)
                                                    })))
                                                }
                                            </TableWrapper>
                                        )
                                    })
                                }
                            </Table>
                            {/*<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>*/}
                                {/*<Text style={styles.text}>Advanced?</Text>*/}
                                {/*<Switch value={this.state.advanced} onValueChange={this.useAdvanced.bind(this)} />*/}
                            {/*</View>*/}
                        </View>
                        <View style={ styles.center }>
                            <TouchableOpacity style={[styles.btn, {opacity: this.state.status === 'Solved' ? 0.2 : 1}]}
                                              onPress={this.solve.bind(this)}
                                              disabled={this.state.status === 'Solved'}>
                                <Text style={styles.btnText}>{ this.state.status }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, {
                                                        backgroundColor: EStyleSheet.value('$secondaryColor'),
                                                        opacity: this.state.status === 'Solve' ? 0.2 : 1
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
                ) : null
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        padding: '1.5rem',
        justifyContent: 'space-evenly'
    },
    header: {
        fontSize: '2rem',
        color: '$primaryColor',
        fontWeight: 'bold',
        fontFamily: '$primaryFont'
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
        flex: 1
    },
    cell: {
        width: '100%',
        height: '2rem'
    },
    cellText: {
        margin: '0.25rem',
        textAlign: 'center',
        fontFamily: '$primaryFont'
    },
    btn: {
        width: '100%',
        height: '2rem',
        marginBottom: '0.25rem',
        backgroundColor: '$primaryColor',
        borderRadius: '0.5rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontFamily: '$primaryFont',
        fontWeight: 'bold'
    }

});