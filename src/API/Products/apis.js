import axios from 'axios';




const url =process.env.REACT_APP_FIELDS_API_URL;



export const PostApi = async (data, getApi, setRows, setData, setPostData, setTableRows, handleClick) => {
  try {
    await axios.post(`${url}/products`, data).then((res) => {
      console.log(res.data);
    });
    getApi(setRows);
    setData({
      id: '',
      name: '',
      type: '',
      required: ''
    });
    setPostData({
      product_name: '',
      display_name: '',
      fields: []
    });
    window.location.reload();
    handleClick();
  } catch (error) {
    console.log(error);
  }
};

export const getApi = async (setData, getApi, setRows) => {
  try {
    await axios.get(`${url}/products`).then((res) => {
      setData(res.data['products']);
    });
    getApi(setRows);
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id, setData) => {
  try {
    axios.get(`${url}/products/${id}`).then((res) => {
      setData(res.data['product']);
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteApi = async (id, getApi, setRow) => {
  try {
    await axios.delete(`${url}/products/${id}`).then((res) => console.log(res));
    // window.location.reload();
    getApi(setRow);
  } catch (err) {
    console.log(err);
  }
};

export const deleteFieldApi = async (id, data) => {
  try {
    await axios.put(`${url}/products/${id}`, data).then((res) => {
      console.log(res.data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const EditFieldApi = async (id, data) => {
  try {
    await axios.put(`${url}/products/${id}`, data).then((res) => {
      console.log(res.data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postNewFieldApi = async (id, data, handleClickOpen, handleClose) => {
  try {
    await axios.post(`${url}/products/${id}/fields`, data).then((res) => {
      console.log(res.data);
    });
    window.location.reload();
    handleClickOpen(id);
    handleClose();
  } catch (err) {
    console.log(err);
  }
};

export const DeleteExistingField = async (productid, fieldid, handleClickOpen) => {
  try {
    await axios.delete(`${url}/products/${productid}/fields/${fieldid}`).then((res) => {
      console.log(res.data);
    });

    handleClickOpen(productid);
  } catch (err) {
    console.log(err);
  }
};

export const EditRequireApi = async (productid, data,handleClickOpen) => {
  try {
    await axios.put(`${url}/products/${productid}/fields/${data.fields[0].field_obj_id}`, { value_required: data.fields[0].value_required }).then((res) => {
      console.log(res.data);
      handleClickOpen(productid);
    });
  } catch (err) {
    console.log(err);
  }
};
