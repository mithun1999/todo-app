/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {USER_SERVER} from '../components/Config';
import { useSelector } from "react-redux";

const getUserId = ()=>{
    const user = useSelector(state => state.user);
    console.log(user.userData._id);
}

export default getUserId;

