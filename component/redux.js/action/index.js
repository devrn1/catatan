import { CHANGE_LIST_, CHANGE_LIST_GRAFIK } from "../type"

// memanggil file type
  
  export const change_list_ = payload => {
    return {
      type: CHANGE_LIST_,
      payload: payload
    }
  }
  export const change_list_grafik = payload => {
    return {
      type: CHANGE_LIST_GRAFIK,
      payload: payload
    }
  }
  