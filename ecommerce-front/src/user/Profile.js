import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {read, update, updateUser} from './ApiUser'

const Profile = (props)=>{
  
       const [values, setValues] = useState({
           name: '',
           email: '',
           password: '',
           error: false,
           success: false
       })
       const {token} = isAuthenticated
       const {name, email, password, error, success} = values

    const init = (userId)=>{
    read(userId, token).then(data=>{
        if(data.error){
      setValues({...values, error: true})
        }else{
            setValues({...values, name: data.name, email: data.email})
        }
    })
    }

    useEffect(()=>{
        init(props.match.params.userId)
    }, [])
    return (
		<Layout title="Profile" description="Update your profile" className="container-fluid">
		<h2 className='mb-4'>Profile update</h2>
        {JSON.stringify(values)}
		</Layout>
	);
}

export default Profile;