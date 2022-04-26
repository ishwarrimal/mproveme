import React, {useState, useEffect} from 'react';
import { View, Modal, Text, Pressable, Alert, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { TextInput, RadioButton, List, Paragraph } from 'react-native-paper';
import { saveMyPlan } from '../Modal/planModal';

const TextInputAvoidingView = ({ children }) => {
    return Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        {children}
      </KeyboardAvoidingView>
    ) : (
      <>{children}</>
    );
  };


export default SettingsModal = ({handleShowSettings}) => {
    const [selectedDay, setSelectedDay] = useState("tomorrow");
    const [overallTime, setOverallTime] = useState([6,22]);
    const [hourlyInterval, setHourlyInterval] = useState('1');

    const handleSubmitSettings = () => {
        const myProgress = {
            hourlyInterval : Number(hourlyInterval),
            selectedDay,
            overallTime
        }
        saveMyPlan(myProgress).then(isSaved => {
            isSaved.status ? handleShowSettings(false) : alert(isSaved.msg);
        })
        
    }

    function handleTimeChange(e){
        setOverallTime(e);
    }

    return (
        <View style={styles.centeredDiv}>
            <Modal
                animationType='slide'
                visible={true}
                transparent={false}
                onRequestClose={() => {
                    Alert.alert('Your settings is not saved');
                    handleShowSettings(false);
                }}
            >
                <View style={styles.centeredDiv}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Update your details</Text>
                        <TextInputAvoidingView>
                            <ScrollView style={styles.inputForm}>
                                {/* <TextInput
                                    style={styles.inputText}
                                    label="Today/Tomorrow"
                                    value={selectedDay}
                                    onChangeText={updateSelectedDat}
                                    placeholder="Today/Tomorrow"
                                /> */}
                                <List.Section title="Select Day" style={{marginBottom: 40, borderBottomWidth: 1}}>
                                    <RadioButton.Group
                                    value={selectedDay}
                                    onValueChange={(value) => setSelectedDay(value)}
                                    >
                                        <View style={styles.row}>
                                            <Paragraph>Tomorrow</Paragraph>
                                            <RadioButton.Android value="tomorrow" />
                                        </View>
                                        <View style={styles.row}>
                                            <Paragraph>Today</Paragraph>
                                            <RadioButton.Android value="today" />
                                        </View>
                                    </RadioButton.Group>
                                </List.Section>
                                    <MultiSlider
                                        enableLabel={true}
                                        min={0}
                                        max={24}
                                        values={[overallTime[0],overallTime[1]]}
                                        onValuesChangeFinish={handleTimeChange}
                                    />
                                <TextInput
                                    style={styles.inputText}
                                    onChangeText={(val)=> {setHourlyInterval(val)}}
                                    value={hourlyInterval}
                                    keyboardType="numeric"
                                    label="Hourly interval"
                                    placeholder="1 or 2"
                                />
                                <Pressable style={[styles.button, styles.buttonSubmit]} onPress={handleSubmitSettings}>
                                    <Text style={styles.textStyle}>Submit</Text>
                                </Pressable>
                                <Pressable style={[styles.button, styles.buttonDismiss]} onPress={() => handleShowSettings(false)}>
                                    <Text style={styles.textStyle}>Dismiss</Text>
                                </Pressable>
                            </ScrollView>
                        </TextInputAvoidingView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredDiv : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
    buttonOpen: {
    backgroundColor: "#F194FF",
    },
    buttonSubmit: {
    backgroundColor: "#2196F3",
    },
    buttonDismiss: {
        marginTop: 20,
        backgroundColor: "red",
        },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    inputForm: {
        flex:1,
    },
    inputText: {
        margin:8,
        marginBottom:40
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
})