import { tagChoices } from "./constants"
import { checkIfStringIsEmpty, isEmoji, isNumber } from "./utilities"

export default class DataManager{
  static isDevelopment = true
  static baseUrl = ""
  static init(isDevelopment = true, baseUrl = "http://localhost:8000/"){
    DataManager.isDevelopment = isDevelopment
    DataManager.baseUrl = baseUrl + "/"
  }
  static async getAllHangouts(){
    const endPoint = DataManager.isDevelopment ? "dev_readAll/" : "readAll/";
    const finalUrl = DataManager.baseUrl + endPoint;
    const response = await fetch(finalUrl)
    const resJson = await response.json()
    return resJson
  }
  static async getOneHangout(pk){
    const endPoint = DataManager.isDevelopment ? "dev_readOne/" : "readOne/";
    const finalUrl = DataManager.baseUrl + endPoint + `${pk}/`;
    const response = await fetch(finalUrl)
    const resJson = await response.json()
    return resJson[0]
  }
  static async deleteOneHangout(pk){
    const endPoint = DataManager.isDevelopment ? "dev_deleteOne/" : "deleteOne/";
    const finalUrl = DataManager.baseUrl + endPoint + `${pk}/`;
    const response = await fetch(finalUrl, {method:"DELETE"})
    const resText = await response.text()
    return resText
  }
  static async createHangout(payload){
    const endPoint = DataManager.isDevelopment ? "dev_createHangout/" : "createHangout/";
    const finalUrl = DataManager.baseUrl + endPoint;
    const response = await fetch(finalUrl, {method:"POST", body:JSON.stringify(payload)})
    const resText = await response.text()
    return resText
  }
  static async updateOneHangout(pk,payload){
    const endPoint = DataManager.isDevelopment ? "dev_updateOne/" : "updateOne/";
    const finalUrl = DataManager.baseUrl + endPoint + `${pk}/`;
    const response = await fetch(finalUrl, {method:"PUT", body:JSON.stringify(payload)})
    const resText = await response.text()
    return resText
  }
  // dev specific endpoints
  static async deleteAllDevHangouts(){
    const endPoint = "dev_deleteAll";
    const finalUrl = DataManager.baseUrl + endPoint + `/`;
    const response = await fetch(finalUrl, {method:"DELETE"})
    const resText = await response.text()
    return resText
  }
  static async createDummyDataset(){
    const endPoint = "dev_createDummyDataset";
    const finalUrl = DataManager.baseUrl + endPoint + `/`;
    const response = await fetch(finalUrl, {method:"POST"})
    const resText = await response.text()
    return resText
  }
  static validateDataPayload(payload){
    // create returning variables
    const returningReport = {
      overallPassed: true,
      name: {error: ""},
      location: {error: ""},
      googlePin: {error: ""},
      emojiIcon: {error: ""},
      votes: {error: ""},
      tag: {error: ""},
      isOffline: {error: ""},
      hasBeenDone: {error: ""},
    }
    // verify name - check if not blank
    if(!checkIfStringIsEmpty(payload.name) || payload.name === null){
      returningReport.overallPassed = false
      returningReport.name.error = "Can't be blank"
      console.error("Name is blank");
    }
    // verify location - verify not blank
    if(!checkIfStringIsEmpty(payload.location) || payload.location === null){
      returningReport.overallPassed = false
      returningReport.location.error = "Can't be blank"
      console.error("Location is blank");
    }
    // verify google pin
    const string = payload.googlePin;
    const substring = "https://maps.app.goo.gl/";
    const regex = new RegExp("^" + substring);
    let regexTest;
    if(regex.test(string)){regexTest  = true}
    if(payload.googlePin){ // check null
      if(!regexTest){
        returningReport.overallPassed = false
        returningReport.googlePin.error = "Not a google pin link"
        console.error("Google pin is not a google pin link");
      }
    }else{
      returningReport.overallPassed = false
      returningReport.googlePin.error = "can't be blank"
      console.error("GooglePin is blank");
    }
    // verify emoji icon
    if(payload.emojiIcon){
      if(!isEmoji(payload.emojiIcon)){
        returningReport.overallPassed = false
        returningReport.emojiIcon.error = "can't be blank";
        console.error("emojiIcon is Not an emoji");
      }
    }else{
      returningReport.overallPassed = false
      returningReport.emojiIcon.error = "can't be blank"
      console.error("emojiIcon is blank");
    }
    // verify votes
    if(payload.votes){
      if(!isNumber(payload.votes)){
        returningReport.overallPassed = false
        returningReport.votes.error = "Votes can't be blank"
        console.error("Votes is blank");
      }
    }else{
      returningReport.overallPassed = false
      returningReport.votes.error = "Votes can't be blank"
      console.error("Votes is blank");
    }
    // verify tag
    if(payload.tag){
      const tags = Object.keys(tagChoices);
      if(!tags.includes(payload.tag)){
        returningReport.overallPassed = false
        returningReport.tag.error = "Invalid Tag"
        console.error("Tag is invalid");
      }
    }else{
      returningReport.overallPassed = false
      returningReport.tag.error = "Tag can't be blank"
      console.error("Tag is blank");
    }
    // verify is offline
    if(payload.isOffline){
      if(typeof payload.isOffline !== "boolean"){
        returningReport.overallPassed = false
        returningReport.isOffline.error = "isOffline must be a boolean"
        console.error("isOffline must be a boolean");
      }
    }else{
      returningReport.overallPassed = false
      returningReport.isOffline.error = "isOffline can't be blank"
      console.error("isOffline is blank");
    }
    // verify has been done
    if(payload.hasBeenDone){
      if(typeof payload.hasBeenDone !== "boolean"){
        returningReport.overallPassed = false
        returningReport.hasBeenDone.error = "hasBeenDone must be a boolean"
        console.error("isOffline must be a boolean");
      }
    }else{
      returningReport.overallPassed = false
      returningReport.hasBeenDone.error = "hasBeenDone can't be blank"
      console.error("hasBeenDone is blank");
    }
  }
}
