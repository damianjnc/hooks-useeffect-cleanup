import {useState} from 'react';

export const useFormInput = () => {
    const [value, setValue] = useState('')
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = (event) => {
        if(event.target.value.trim() === '' ){
            setValidity(false)
        }else{
            setValidity(true)
        }
    }
    return {value: value, onChange:inputChangeHandler, validity}
}