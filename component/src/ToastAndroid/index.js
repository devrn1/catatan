import React from 'react'
import {ToastAndroid} from 'react-native'

const ToastAndroidScreen = (message)  => {
    return ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER, //can be TOP, BOTTON, CENTER
      );
}

export default ToastAndroidScreen