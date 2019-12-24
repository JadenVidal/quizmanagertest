import { getCookie } from './cookie' 
import Api from '../services/api'
  
  const getUserType = async () => {
    const id = getCookie('session')
    const userKey = await getUserKeyFromId(id)
    if(userKey !== null){
        const arrayOfSchoolKeys = await getSchoolKeysFromUserKey(userKey)
        if(arrayOfSchoolKeys !== null){
            const typeOfUser = await  getTypeOfUserFromArrayOfKeys(arrayOfSchoolKeys, userKey)
            return typeOfUser
        }
    }
  }

  const getUserKeyFromId = async (id) => {
    try {
      let response = await Api.get(`users/${id}`)
      return response.data.key
    } catch (error) {
      console.error(error)
    }
  }

  const getUserFromId = async (id) => {
    try {
      let response = await Api.get(`users/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getSchoolFromUserKey = async (userKey) => {
    try {
        let response = await Api.get(`schools/key/${userKey}`)
        return response.data[0].name 
    } catch (error) {
      console.error(error)
    }
  }

  const getSchoolKeysFromUserKey = async (userKey) => {
    try {
        let response = await Api.get(`schools/key/${userKey}`)
        return response.data[0].keys
    } catch (error) {
      console.error(error)
    }
  }

  const getTypeOfUserFromArrayOfKeys = async (arrayOfSchoolKeys, userKey) => {
    const userKeyFunct = (element) => userKey;
    const index = arrayOfSchoolKeys.findIndex(userKeyFunct)
    let type = "";
    switch(index){
        case 0:
            type = "top"
            break;
        case 1:
            type = "mid";
            break;
        case 2: 
            type = "low";  
            break;
        default:
    }
    return type
  }
    
export { getUserType, getUserFromId, getSchoolFromUserKey }