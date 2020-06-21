import React, { Component } from 'react';
import Noty from 'noty' 
let show_noty= function show_noty(args,kwargs){
    let new_noty= new Noty({
        type:args,
        theme:'sunset',
        layout:'center',
        text:kwargs,
        timeout:1000,


    }).show()
return new_noty
}

export default show_noty;