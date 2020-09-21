import React, { useState, useEffect } from 'react'
import { requireNativeComponent } from 'react-native';
const formatRupiah = (angka) => {
    var bilangan =  angka === "" || angka === null || angka === undefined ? 0 : angka;
    var	reverse = bilangan.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join('.').split('').reverse().join('');

    // Cetak hasil	
return angka === "" || angka === null || angka === undefined ? "" : ribuan
}

export default formatRupiah