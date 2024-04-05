import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const formsendData = {
    email: email,
    password: password,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkInputs();
    setLoading(true);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:4000/api/login/admin`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(formsendData));
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        console.log(xhr);
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          if (json_obj.message === "success") {
            setEmail("");
            setPassword("");
            setLoading(false);
            localStorage.setItem("authToken", json_obj.token);
            toast.success("Login Successfull");
            window.location.href = "/listBooks";
          } else {
            toast.error("There is an error");
            console.error(json_obj.message);
            setLoading(false);
          }
        } else if (xhr.status === 400) {
          toast.error(JSON.parse(xhr.responseText).message);
          setLoading(false);
          console.error(xhr.message);
        } else {
          toast.error("Something went wrong try again");
        }
      }
    };
    xhr.onerror = function () {
      console.error(xhr.statusText);
    };
 
    // const email = document.getElementById("email");
    // const password = document.getElementById("password");



    // function checkInputs() {
    //   //Get the value the form field.
     
    //   // const emailValue = email.value.trim();
    //   // const passwordValue = password.value.trim();
 
    //   // if (emailValue === "") {
    //   //   setErrorInput(email, "Email cannot be blank.");
    //   // } else {
    //   //   validateEmail(emailValue) && setSuccessInput(email);
    //   // }


    //   // if (passwordValue === "") {
    //   //   setErrorInput(password, "Password connot be blank.");
    //   // } else {
    //   //   setSuccessInput(password) && validatePassword(passwordValue);
    //   // }
    // }

    // function setErrorInput(input, errorMessage) {
    //   const formControl = input.parentElement;
    //   const small = formControl.querySelector("small");

    //   small.innerText = errorMessage;
    //   formControl.className = "form__control error";
    // }

    // function setSuccessInput(input) {
    //   const formControl = input.parentElement;
    //   formControl.className = "form__control success";
    // }

    // function validateEmail(email) {
    //   let regular_expressions = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return regular_expressions.test(String(email).toLocaleLowerCase());
    // }

    // function validatePassword(password) {
    //   let regular_expressions = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    //   return regular_expressions.match(regular_expressions);
    // }


  };

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleFormSubmit}>
        <div className="h4 mb-2 text-center">Admin Login</div>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>

          <Form.Control
            type="email"
            value={email}
            placeholder="example@gmail.com"
            id="email"
            onChange={(e) => setEmail(e.target.value)}

          />
        </Form.Group>
        <small>Error message</small>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>
        <small>Error message</small>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Login;