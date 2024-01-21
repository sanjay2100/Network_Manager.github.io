import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.100.181:8888';

export const PostApi = async (data, getApi, setRows,setData,setPostData,setTableRows,handleClick) => {
  try {
    await axios.post('/products', data).then((res) => {
      console.log(res.data);
    });
    getApi(setRows);
    setData({
      id: '',
      name: '',
      type: '', 
      required: ''
    })
    setPostData({
      product_name: '',
      display_name: '',
      fields: []
    })
    window.location.reload()
    handleClick()
  } catch (error) {
    console.log(error);
  }
};

export const getApi = async (setData, getApi, setRows) => {
  try {
    await axios.get('/products').then((res) => {
      setData(res.data);
    });
    getApi(setRows);
  } catch (error) {
    console.log(error);
  }
};

export const getById =async(id,setData)=>{
    try {
        axios.get(`/products/${id}`).then((res) => {setData(res.data['product'])})
        
    }
    catch (err) {
      console.log(err);
    }
}

export const deleteApi = async (id,getApi,setRow) => {
  try {
    await axios.delete(`/products/${id}`).then((res) => console.log(res));
    // window.location.reload();
    getApi(setRow);
  } catch (err) {
    console.log(err);
  }
};


export const deleteFieldApi=async(id,data,)=>{
  try{
    await axios.put(`/products/${id}`,data)
    .then((res)=>{
        console.log(res.data)
    })
    }
  
  catch(err){
    console.log(err)
  }
}

export const postNewFieldApi = async (id,data,handleClickOpen,handleClose)=>{
  try{
    await axios.post(`http://192.168.100.181:8888/products/${id}/fields`,data)
   .then((res)=>{
        console.log(res.data)
    })
    window.location.reload()
    handleClickOpen(id)
    handleClose()
    }
  
  catch(err){
    console.log(err)
  }
}

export const DeleteExistingField=async(productid,fieldid,handleClickOpen)=>{
  try{
    await axios.delete(`http://192.168.100.181:8888/products/${productid}/fields/${fieldid}`)
  .then((res)=>{
        console.log(res.data)
    })


    handleClickOpen(productid)

    }
  
  catch(err){
    console.log(err)
  }
}
