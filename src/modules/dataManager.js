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
}
