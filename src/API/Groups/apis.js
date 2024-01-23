import axios from 'axios';


const url =process.env.REACT_APP_GROUP_URL;

export const CreateGroup = async (data, handlesnackClick, setPostData) => {
  try {
    await axios.post(`${url}/groups`, data).then((res) => {
      if (res.status == 201) {
        handlesnackClick();
        setPostData({
          members: []
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetGroups = async (setGetdata) => {
  try {
    await axios.get(`${url}/groups`).then((res) => {
      setGetdata(res.data);
      console.log(res.data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const AddUser=async(id,data,setGetdata,handleClick,handleErrClick) => {
  try {
    await axios.put(`${url}/groups/add_users/${id}`, data).then((res) => {
      handleClick()
      console.log(res.data);
    });
    GetGroups(setGetdata);

  } catch (error) {
    handleErrClick()
    console.log(error);
  }
}

export const getAllUsers=async(setUserRows)=>{
  try {
    await axios.get(`${url}/users`).then((res) => {
      setUserRows(res.data);
      console.log(res.data);
    })
  }
  catch(error){
    console.log(error)
  }
}

export const DeleteGroup=async(id,setGroup)=>{
  try {
    await axios.delete(`${url}/groups/${id}`).then((res) => {
      console.log(res.data);
    })
    GetGroups(setGroup)

  }
  catch(error){
    console.log(error)
  }
}
