import React, { Component, lazy } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
import LastRecordedCom from '../../../Components/BMIcomponent/LastRecordedCom';
import HeightIcon from "../../../img/height.png";
import WeightIcon from "../../../img/weight.png";
import Button5 from "../../../Components/ButtonCom/Button5";
import UpdatingIcon from "../../../img/updating.png";
import StatisticsIcon from "../../../img/statistics.png";
import NumeralBox5 from '../../../Components/NumeralCom/NumeralBox5';


class BMIScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRecorded: {},
            lastRecorded: {},
            lastDate: "",
            reload: false
        }
        this.UpdateBtnClicked = this.UpdateBtnClicked.bind(this);
    }
    async componentDidMount() {
        console.log("BMI MOUNT");
        let healthCare = JSON.parse(
            await AsyncStorage.getItem('healthcare'));
        let { listRecorded } = healthCare;
        let lastRecorded = JSON.parse(
            await AsyncStorage.getItem('lastRecorded'));
        let { BMI } = lastRecorded;
        this.setState(state => {
            return {
                listRecorded: listRecorded,
                lastRecorded: BMI,
            }
        });
        this.setState(state => {
            return {
                lastDate: this.state.listRecorded[this.state.listRecorded.length - 1].Date
            }
        })
    }
    async componentWillUnmount(){
        console.log("BMI unmount");
    }
    UpdateBtnClicked(){
        let {lastRecorded} = this.state;
        let {navigation} = this.props;
        this.props.navigation.replace('Update');
        navigation.navigate("Update", { lastRecorded: lastRecorded});
    }
    render() {
        let { lastRecorded, listRecorded, lastDate } = this.state;
        let { navigation } = this.props;
        return <View style={styles.container}>
            <LastRecordedCom
                data={lastRecorded}
                lastDate={lastDate}
            />
            <View style={styles.height_weight}>
                <NumeralBox5
                    icon={HeightIcon}
                    value={lastRecorded.height}
                />
                <NumeralBox5
                    icon={WeightIcon}
                    value={lastRecorded.weight}
                />
            </View>
            <View style={styles.ButtonArea}>
                <Button5
                    icon={UpdatingIcon}
                    name={"Cập Nhật"}
                    onClicked={this.UpdateBtnClicked}
                />
                <Button5
                    icon={StatisticsIcon}
                    name={"Lịch sử"}
                    onClicked={() => navigation.navigate("Statistics", { listRecorded: listRecorded })}
                />
            </View>
        </View>
    }
}

export default BMIScreen;

let styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },
    height_weight: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: "10%",
        width: "95%"
    },
    ButtonArea: {
        marginTop: 20,
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-around",
    }
});