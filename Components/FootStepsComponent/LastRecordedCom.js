import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
import FootStepsIcon from "../../img/footsteps1.png";

class LastRecordedCom extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { data } = this.props;
        let { lastDate } = this.props;
        return <View style={styles.container}>
            <View style={styles.numberal}>
                <Image
                    source={FootStepsIcon}
                    style={{
                        height: ScreenWidth*25/100,
                        width: ScreenWidth*25/100
                    }}
                />
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{`${data.numeral} ${data.unit}`}</Text>
                <Text style={{ fontSize: 15 }}>{data.rate}</Text>
                <Text style={{ fontSize: 10 }}>{lastDate}</Text>
            </View>
        </View>
    }
}

export default LastRecordedCom;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        height: "40%",
        width: "70%",
        borderColor: "red",
        borderWidth: 2,
    },
    numberal: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    Icon: {
        width: ScreenWidth * 20 / 10,
        height: ScreenWidth * 20 / 10,
    }
})