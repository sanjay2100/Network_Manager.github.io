import { Button, TextField, Snackbar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconTrash } from '@tabler/icons-react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import SubCard from 'ui-component/cards/SubCard';
import MuiAlert from '@mui/material/Alert';
import PostApi from 'API/MDM/apis';

const DataPoints = () => {
  const [Selected, setSelected] = useState();

  const [PostData, setPostData] = useState({});

  const [NameErr, setNameErr] = useState(false);
  const [DNameErr, setDNameErr] = useState(false);
  const [TypeErr, setTypeErr] = useState(false);

  const ref = useRef();

  const [Data, setData] = useState({
    name: '',
    display_name: '',
    type: '',
    options: [],
    details: {}
  });
  const [FieldErrAlert,setFieldErrAlert]=useState(false)

  ////console.log(Data);

  const [OpenAlert, setOpenAlert] = useState(false);
  const [OpenErrAlert, setErrAlert] = useState(false);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleErrOpen = () => {
    setErrAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
    setErrAlert(false);
  };

  useEffect(() => {
    handlePost();
  }, [Data]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handlePost = () => {
    const filteredObject = {};
    for (const [key, value] of Object.entries(Data)) {
      if (value !== '') {
        filteredObject[key] = value;
        setPostData(filteredObject);
      }
    }
    // if(Data.options.length<2){

    // }

    ////console.log(filteredObject);
  };

  const dataType = [
    {
      type: 'Text',
      fields: [
        [
          {
            id: 'Regex',
            name: 'Regex',
            type: 'text'
          },
          {
            id: 'minLength',
            name: 'Min Length',
            type: 'number'
          },
          {
            id: 'maxLength',
            name: 'Max Length',
            type: 'number'
          }
        ]
      ]
    },
    {
      type: 'Number',
      fields: [
        [
          {
            id: 'Regex',
            name: 'Regex',
            type: 'text'
          },
          {
            id: 'minValue',
            name: 'Min Value',
            type: 'number'
          },
          {
            id: 'maxValue',
            name: 'Max Value',
            type: 'number'
          }
        ]
      ]
    },
    {
      type: 'Yes/No',
      fields: null
    },
    {
      type: 'Option',
      fields: [
        [
          {
            id: 'optionDisplayName',
            name: 'Option display name',
            type: 'text'
          },
          {
            id: 'optionValue',
            name: 'value',
            type: 'text'
          },
          {
            name: '+',
            type: 'button'
          }
        ]
      ]
    },
    {
      type: 'Select List',
      fields: [
        [
          {
            id: 'optionDisplayName',
            name: 'Option display name',
            type: 'text'
          },
          {
            id: 'optionValue',
            name: 'value',
            type: 'file'
          },
          {
            name: '+',
            type: 'button'
          }
        ]
      ]
    },
    {
      type: 'Documents',
      fields: [
        [
          {
            id: 'type',
            name: 'Document type',
            type: 'text'
          },
          {
            id: 'maxSize',
            name: 'Min Size',
            type: 'text'
          },
          {
            id: 'minSize',
            name: 'Max Size',
            type: 'text'
          }
        ]
      ]
    },

    {
      type: 'Media(Image/Video/Audio)',
      fields: [
        [
          {
            id: 'type',
            name: 'Document type',
            type: 'text'
          },
          {
            id: 'maxSize',
            name: 'Min Size',
            type: 'text'
          },
          {
            id: 'minSize',
            name: 'Max Size',
            type: 'text'
          }
        ]
      ]
    }
  ];

  const handleAdd = () => {
    const obj = [
      {
        id: 'optionDisplayName',
        name: 'Option display name',
        type: 'text'
      },
      {
        id: 'optionValue',
        name: 'value',
        type: 'text'
      },
      {
        name: '+',
        type: 'button'
      }
    ];
    const dataField = {
      Displayname: '',
      type: ''
    };
    ////console.log(Selected);

    setSelected([...Selected, obj]);

    setData({
      ...Data,
      options: [...Data.options, dataField]
    });
    ////console.log("Options" + Selected);
    ////console.log(Data);
  };

  // // delete
  const handleDelete = (index) => {
    let data = [...Selected.slice(0, index), ...Selected.slice(index + 1)];
    let mainData = [...Data.options.slice(0, index), ...Data.options.slice(index + 1)];
    console.log('maindata', mainData);
    setData({ ...Data, options: mainData });

    setSelected(data);
    console.log("selected",Selected);
     setPostData({...PostData,options:[...PostData.options.slice(0, index),...PostData.options.slice(index + 1)]})
    ////console.log(data);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PostData.name) {
      setNameErr(true);
      setFieldErrAlert(true);
    } else if (!PostData.display_name) {
      setDNameErr(true);
      setFieldErrAlert(true);

    } else if (!PostData.type) {
      setTypeErr(true);
      setFieldErrAlert(true);

    } else PostApi(PostData, handleClick, setData, ref, handleErrOpen);

    //console.log(PostData);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
    setErrAlert(false);
    setFieldErrAlert(false)
  };

  const handleChange = (event) => {
    //console.log(dataType);
    const sel = dataType.find((data) => {
      return data.type === event;
    });
    //console.log(sel);
    setSelected(sel.fields);
  };
  console.log(Selected);

  const handleDataChange = (id, data, index) => {
    ////console.log(index, +' ' + id);
    if (id === 'Name') {
      setData({ ...Data, name: data });
      setNameErr(false);
    }
    if (id === 'Displayname') {
      setData({ ...Data, display_name: data });
      setDNameErr(false);
    }
    if (id === 'type') {
      setSelected(null)
      setData(null)
      setPostData(null)
      setData({ ...Data, type: data });
      setTypeErr(false);
    }
    if (id === 'Regex') {
      setData({
        ...Data,
        details: {
          ...Data.details,
          Regex: data
        }
      });
    }
    if (id === 'minLength') {
      setData({
        ...Data,
        details: {
          ...Data.details,
          minLength: data
        }
      });
    }
    if (id === 'maxLength') {
      setData({
        ...Data,
        details: {
          ...Data.details,
          maxLength: data
        }
      });
    }
    if (id === 'unique') {
      setData({
        ...Data,
        details: {
          ...Data.details,
          unique: data === 'True' ? true : false
        }
      });
    }
    if (id === 'minValue') {
      setData({
        ...Data,
        details: {
          ...Data.details,
          minValue: data
        }
      });
    }
    if (id === 'maxValue') {
      setData({
        ...Data,
        details: {
          ...Data.details,
          maxValue: data
        }
      });
    }
    if (id === 'optionDisplayName' && index !== null) {
      ////console.log(index);
      setData((prevData) => {
        //console.log(prevData);
        const updatedOptions = [...prevData.options];
        ////console.log(updatedOptions);
        updatedOptions[index] = { ...updatedOptions[index], Displayname: data };
        return { ...prevData, options: updatedOptions };
      });
    }
    if (id === 'optionValue' && index !== null) {
      ////console.log(index);
      setData((prevData) => {
        //console.log(prevData);
        const updatedOptions = [...prevData.options];
        updatedOptions[index] = { ...updatedOptions[index], type: data };
        return { ...prevData, options: updatedOptions };
      });
    }

  };
  console.log(Data);

  return (
    <form onSubmit={handleSubmit}>
      <SubCard title="Add data point">
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={OpenAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Field Added
          </Alert>
        </Snackbar>

        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={OpenErrAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Something went wrong!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={FieldErrAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            Fill the required fields
          </Alert>
        </Snackbar>

        <Grid container sx={{ mt: 1 }} xl={12} justifyContent="space-between">
          <Grid item xl={6} md={6} xs={12}>
            <TextField
              error={NameErr}
              size="large"
              label="Name*"
              value={Data.name}
              fullWidth
              onChange={(e) => handleDataChange('Name', e.target.value, null)}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }} xl={12}>
          <Grid item xl={6} md={6} xs={12}>
            <TextField
              error={DNameErr}
              size="large"
              label="Display Name*"
              value={Data.display_name}
              fullWidth
              onChange={(e) => handleDataChange('Displayname', e.target.value, null)}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 3 }}>
          <Grid item xl={4} md={6} xs={12}>
            <FormControl fullWidth size="large">
              <InputLabel id="demo-select-small-label">Type</InputLabel>
              <Select
                error={TypeErr}
                labelId="demo-select-small-label"
                id="demo-select-small"
                ref={ref}
                label="Type*"
                value={Data.type}
                onChange={(e) => {
                  handleDataChange('type', e.target.value, null);
                  handleChange(e.target.value);
                }}
              >
                {dataType.map((item, index) => (
                  <MenuItem key={index} value={item.type}>
                    {item.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <FormControl sx={{ mt: 3, display: Data.type === 'Text' ? 'block' : 'none' }}>
          <FormLabel id="demo-radio-buttons-group-label">Unique</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            onChange={(e) => {
              handleDataChange('unique', e.target.value, null);
            }}
          >
            <FormControlLabel value="True" control={<Radio />} label="True" />
            <FormControlLabel value="False" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
        {/* postdata.options[index].Displayname/type */}
        <div style={{ width: '100%' }}>
          {Data.type !== '' &&
            Data.type !== null &&
            Array.isArray(Selected) &&
            Selected.map((subFields, subIndex) => (
              <Grid container justifyContent="space-between" xl={12} sx={{ mt: 3 }} key={subIndex}>
                {subFields.map((subItem, OptionIndex) => (
                  <Grid item xl={3} key={OptionIndex}>
                    <TextField
                      key={subItem.id}
                      size="large"
                      label={subItem.name||""}
                      value={subItem.id==="optionDisplayName"&&Data.options[subIndex]?Data.options[subIndex].Displayname : subItem.id==="optionValue"&&Data.options[subIndex]?Data.options[subIndex].type :Data.details.subItem}
                      fullWidth
                      sx={{ display: subItem.type === 'button' ? 'none' : 'block', mt: 2 }}
                      onChange={(e) => handleDataChange(subItem.id, e.target.value, subIndex, OptionIndex)}
                    />

                    <Button
                      onClick={subIndex == Selected.length - 1 ? handleAdd : () => handleDelete(subIndex)}
                      size="small"
                      variant="outlined"
                      sx={{ display: subItem.type !== 'button' ? 'none' : 'block', mt: 3 }}
                    >
                      {subIndex == Selected.length - 1 ? subItem.name : <IconTrash />}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ))}
        </div>

        <Grid container xl={12} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Button color="secondary" variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </SubCard>
    </form>
  );
};

export default DataPoints;
