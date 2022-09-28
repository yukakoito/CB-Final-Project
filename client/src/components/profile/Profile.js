import styled from "styled-components";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
const { userId } = useParams();

  return (
    <h1>Profile</h1>
  )
}

export default Profile;