import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native'
import {BarCodeScanner} from "expo-barcode-scanner"
import * as Permissions from 'expo-permissions' 
import * as firebase from "firebase"
import db from "../config.js"

export default class TransactionScreen extends React.Component{
    
    constructor(){
        super()
        this.state= {
            hasPermissions: null,
            scanned: false,
            scannedBookID: "",
            scannedStudentID: "",
            buttonState: "normal",
            transactionMessage: ""
        }
    }
    
    getCameraPermission =async (id)=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasPermissions: status === "granted",
            scanned: false,
            buttonState: id
        })
        
    }
   
    handleBarCodeScan =async({type,data})=>{
        if(this.state.buttonState=== "bookID"){
            this.setState({
                scanned: true,
                scannedBookID: data, 
                buttonState: "normal"
            })
        }
        else if(this.state.buttonState=== "studentID"){
            this.setState({
                scanned: true,
                scannedStudentID: data, 
                buttonState: "normal"
            })
        }
        
    }

    initiateBookIssue =async()=>{

        //Adding a new transaction
        db.collection("transanctions").add({
            studentId: this.state.scannedStudentID,
            bookId: this.state.scannedBookID,
            date: firebase.firestore.Timestamp.now().toDate(),
            transactionType: "Issue"
        })

        //Changing book availability status to false
        db.collection("books").doc(this.state.scannedBookID).update({
            bookAvailibility: false
        })

        //Increasing the no. of books issued by this student
        db.collection("students").doc(this.state.scannedStudentID).update({
            numberOfBooksIssued : firebase.firestore.FieldValue.increment(1)
        });
        
        //Getting ready for the next transaction
        this.setState({
            scannedStudentID: "",
            scannedBookID: ""
        })

    }

    initiateBookReturn =async()=>{

        //Adding a new transaction
        db.collection("transanctions").add({
            studentId: this.state.scannedStudentID,
            bookId: this.state.scannedBookID,
            date: firebase.firestore.Timestamp.now().toDate(),
            transactionType: "Return"
        })

        //Changing book availability status to True
        db.collection("books").doc(this.state.scannedBookID).update({
            bookAvailibility: true
        })

        //Decreasing the no. of books issued by this student
        db.collection("students").doc(this.state.scannedStudentID).update({
            numberOfBooksIssued : firebase.firestore.FieldValue.increment(-1)
        });
        
        //Getting ready for the next transaction
        this.setState({
            scannedStudentID: "",
            scannedBookID: ""
        })

    }
    
    handleTransaction =async()=>{
        var message;
        db.collection("books").doc(this.state.scannedBookID).get()
        .then((doc)=>{
            var book= doc.data()
            if(book.bookAvailibility){
                this.initiateBookIssue()
                message = "Book Issued";
            } else {
                this.initiateBookReturn()
                message = "Book Returned";
            }    
        });

        this.setState({
            transactionMessage: message
        })
    }

    
    
    render(){
        if(this.state.hasPermissions && this.state.buttonState !== "normal"){
            return(
                <BarCodeScanner style= {StyleSheet.absoluteFillObject} onBarCodeScanned= {this.state.scanned ? undefined : this.handleBarCodeScan}/>
            )
        }else if(this.state.buttonState==="normal"){
            return(
                <View style = {styles.container}>
                    <View>
                        <Image source ={require("../assets/booklogo.jpg")}/>
                        <Text style = {{textAlign: 'center', fontSize: 30}}>Wireless Library</Text>
                    </View>
                    
                    
                    <View style= {styles.inputView}>
                        <TextInput placeholder= "Enter Book ID" value={this.state.scannedBookID} style= {styles.inputBox}/>
                        <TouchableOpacity style= {styles.scanButton} onPress= {()=>{
                                this.getCameraPermission("bookID")
                        }}>
                            <Text style= {styles.buttonText}>SCAN QR CODE</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style= {styles.inputView}>
                        <TextInput placeholder= "Enter Student ID" value={this.state.scannedStudentID} style= {styles.inputBox}/>
                        <TouchableOpacity style= {styles.scanButton} onPress= {()=>{
                                this.getCameraPermission("bookID")
                        }}>
                            <Text style= {styles.buttonText}>SCAN QR CODE</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style = {styles.submitButton} onPress= {async()=>{
                        var transactionMessage= await this.handleTransaction()
                    }}>
                        <Text style = {styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                    
                    
                </View>
            )
        }
       
    }
}
 const styles= StyleSheet.create({
     container:{
         flex: 1,
         justifyContent: "center",
         alignItems: "center"
     },
     displayText:{
         fontSize: 15,
         textDecorationLine: "underline",
     },
     scanButton:{
         padding: 10,
         margin: 10,
         backgroundColor: "#2196f3"
     },
     inputView:{
        flexDirection: 'row',
        margin: 20
      },
      inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
      },
      submitButton:{
        backgroundColor: '#FBC02D',
        width: 100,
        height:50
      },
      submitButtonText:{
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight:"bold",
        color: 'white'
      }
 })