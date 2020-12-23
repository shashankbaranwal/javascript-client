import styled, { css } from 'styled-components';

const Div = styled.div`
<<<<<<< HEAD
padding: 20px;
border: 0.1px solid black;
=======
margin: 1px;
border: 1px solid black;
>>>>>>> adc8e395537812b79ed6697b64297919d46caa8c
`;
const Error = styled.p`
color: red;
`;
const Input = styled.input`
width:98.5%;
padding: 0.7%;
border: 1px solid gray;
border-radius: 5px;
color: solid gray;
${(props) => props.error
        && css`
    border: 1px solid red;
    color: red;
    `};
}
${(props) => (props.value && !props.disabled && !props.error)
        && css`
    border: 1px solid orange;
    color: black;
    `};
}
`;
export { Div, Error, Input };
