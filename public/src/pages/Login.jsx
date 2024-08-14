import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";


export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="left">
        <div className="brand leftside">
            <img src={Logo} alt="logo" />
            <h1>QuasarChat</h1>
            <p>
              A simple chat application built with React, Node.js, Express.js, and Socket.io. My philosophy is to keep things simple and easy to use.
              World is a place where we all live together, so let's chat together. My name is <a href="https://linkedin.com/in/harshil-sanghvi">Harshil Sanghvi</a> and I am the creator of this application. With the help of resources from <a href="https://youtu.be/otaQKODEUFs?si=NFFq2-QjuSjORJ86">YouTube</a> and <a href="https://www.google.com/">Google</a>, I was able to build this application. I hope you like it.
            </p>
            <div className="social-links">
            <a className="git" href="https://github.com/harshil-sanghvi" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a className="linkedin" href="https://linkedin.com/in/harshilsanghvi" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a className="scholar" href="https://scholar.google.com/citations?user=mO8N2hkAAAAJ" target="_blank" rel="noopener noreferrer">
              <SiGooglescholar />
            </a>
          </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Login</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            minLength="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Let's Chat!</button>
          <span>
            Don't have an account? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324; // login rightside background color

  .social-links {
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    font-size: 2rem;
    margin-top: 1rem;
    a {
      color: #000000b3;
      // color: blue;
      text-decoration: none;
      font-weight: bold;
    }

    .scholar:hover {
      color: blue;
    }
    .linkedin:hover {
      color: blue;
    }
    .git:hover {
      color: black;
    }
  }
  
  .left {
    background-color: #ffffff; // login leftside background color
    height: 100vh;
    width: 50vw;
    border-radius: 0 2rem 2rem 0;
  }

  .leftside {
    margin-top: 5rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    p {
      margin-top: 2rem;
      width: 80%;
      line-height: 1.5;
      line-gap: 1.5;
      color: black;
      text-align: center;
      font-size: 1.4rem;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 { // login leftside title
      background: linear-gradient(to right, #003366, #0052a5, #0077cc, #0099ff, #0077cc, #0052a5, #003366);
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background-color: #ffffff; // login rightside background color
    border-radius: 1rem;
    padding: 1.3rem;
    h1 {
      color: darkblue; // login rightside title
      text-align: center;
    }
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    font-size: 1.2rem;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.2rem solid darkblue;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 0.5rem 0.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1.25rem;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: black;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
