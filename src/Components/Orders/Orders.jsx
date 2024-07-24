import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Helmet } from 'react-helmet';

export default function Orders() {

  const {userData} = useContext(AuthContext);
  console.log(userData.id);

  return (
    <>
      <Helmet>
        <title>FreshCart - orders</title>
      </Helmet>
    </>
  )
}
