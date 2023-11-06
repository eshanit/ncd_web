import  { defineRule } from 'vee-validate';
import {  required, min, max } from '@vee-validate/rules';

defineRule('district', (value: unknown) => {
    if( (required(value) && min(value, { length: 1 }) && max(value, { length: 300 })))
    {
        return true;
    }
    return 'Please provide district';
});


