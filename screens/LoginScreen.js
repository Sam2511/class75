import React from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, Image, KeyboardAvoidingView, Touchable} from 'react-native'
import firebase from "firebase"

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '' 
        }
    }
    
    login= async(email, password)=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("Transaction")
                }
            }
            catch(error){
                switch(error.code){
                    case "auth/user-not-found": 
                        Alert.alert("user does not exist");
                        break;
                    case "auth/invalid-email":
                        Alert.alert("incorrect email or password")
                        break;
                }
            }
        }
        else{
            Alert.alert("enter email and passsword")
        }
    }


    render(){

        return(
            <KeyboardAvoidingView>
                <View>
                    <Image source ={require("../assets/booklogo.jpg")} style = {{width: 200, height: 200}}/>
                    <Text style = {{textAlign: 'center', fontSize: 30}}>Wireless Library</Text>
                </View>
                <View>
                    <TextInput style= {styles.loginBox}
                    placeholder= "Enter Email ID"
                    keyboardType= "email-address"
                    onChangeText= {(text)=>{
                        this.setState(
                    {
                        emailId:text
                    }
                        )
                    }}
                    />
                    <TextInput style= {styles.loginBox}
                    placeholder= "Enter Password"
                    secureTextEntry={true}
                    onChangeText= {(text)=>{
                        this.setState(
                    {
                        password:text
                    }
                        )
                    }}
                    />
                </View>
                <View>
                    <TouchableOpacity style = {styles.button} onPress={()=>{this.login(this.state.emailId,this.state.password)}}>
                        <Text style={styles.text}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    button: {
        height: 30,
        width: 90,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 7
    },
    text: {
        textAlign: 'center'
    }
});