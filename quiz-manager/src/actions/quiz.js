import Api from '../services/api'
  
  const getQuizesBySchool = async (username, school) => {
    try {
        const response = await Api.get(`quiz/${username}/${school}`)
        return response
    } catch (error) {
      console.error(error)
    }

  }

  const getQuizesByUsername = async (username) => {
    try {
        return await Api.get(`quiz/${username}`)
    } catch (error) {
      console.error(error)
    }
  }

    
export { getQuizesByUsername, getQuizesBySchool }