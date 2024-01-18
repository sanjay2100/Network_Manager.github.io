import React from 'react'

function FormControl() {
    return (
        <FormControl sx={{ m: 2, minWidth: '100%' }} size="large">
            <InputLabel id="demo-select-small-label">Product Name</InputLabel>
            <Select
                labelId="demo-select-label"
                id="demo-select"
                value={age}
                label="Product Name"
                onChange={handleChange}
            >

                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

export default FormControl
