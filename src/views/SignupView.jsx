import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomAlert from '../components/CustomAlert';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import colors from '../constants/colors';
import globalStyles from '../constants/styles';
import {authSignUp} from '../services/auth';

function SignupView() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("Mexico");
    const [state, setState] = useState("Nuevo Leon");
    const [streetAddr, setStreetAddr] = useState("");
    const [zipCode, setZipCode] = useState("");

  	const [alertVariant, setAlertVariant] = useState('danger');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory();

	const onCloseAlert = () => {
        setShowAlert(false);
    }

    const onEmailChange = event => {
        setEmail(event.target.value);
    }

    const onPasswordChange = event => {
        setPassword(event.target.value);
    }
    
    const onConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    }

    const onUsernameChange = event => {
        setUsername(event.target.value);
    }

    const onFirstNameChange = event => {
        setFirstName(event.target.value);
    }

    const onLastNameChange = event => {
        setLastName(event.target.value);
    }

    const onCountryChange = event => {
        setCountry(event.target.value);
    }

    const onStateChange = event => {
        setState(event.target.value);
    }

    const onStreetAddrChange = event => {
        setStreetAddr(event.target.value);
    }

    const onZipCodeChange = event => {
        setZipCode(event.target.value);
    }

	const postSignup= (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            setAlertVariant('danger');
            setAlertMessage('Passwords do not match!');
            setShowAlert(true);
            return;
        }
        
        authSignUp({
            name: firstName,
            last_name: lastName,
            user_name: username,
            email: email,
            street_addr: streetAddr,
            zip_code: zipCode,
            country: country,
            state: state,
            password: password,

        })
        .then(result => {
            if (result.success) {
                history.push('/login');
            } else {
                setAlertVariant('danger');
                setAlertMessage('Error signing up');
                setShowAlert(true);
            }
        })
        .catch(e => {
            setAlertVariant('danger');
            setAlertMessage('Error signing up');
            setShowAlert(true);
        })
    }

    return (
        <Container style={styles.loginContainer}>
            <CustomAlert
                variant={alertVariant}
                message={alertMessage} 
                show={showAlert} 
                onClose={onCloseAlert}
            />
            <h1 style={styles.loginTitle}>Signup</h1>
            <div style={styles.loginCard}>
                <Form onSubmit={postSignup}>
                    <h3>Basic Information</h3>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Username" 
                            onChange={onUsernameChange} 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            placeholder="Email" 
                            onChange={onEmailChange} 
                            required
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name" 
                                    onChange={onFirstNameChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name" 
                                    onChange={onLastNameChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Control 
                            type="password"
                            placeholder="Password" 
                            onChange={onPasswordChange} 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            type="password"
                            placeholder="Confirm password" 
                            onChange={onConfirmPasswordChange} 
                            required
                        />
                    </Form.Group>
                    <h3 className='mt-3'>Location</h3>
                    <Form.Group>
                        <Form.Label>Select your country</Form.Label>
                        <Form.Control as="select" onChange={onCountryChange}>
                            <option value="Mexico">Mexico</option>
                            <option value="United States">United States</option>
                            <option value="China">China</option>
                            <option value="Canada">Canada</option>
                            <option value="Guatemala">Guatemala</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select your state</Form.Label>
                        <Form.Control as="select" onChange={onStateChange}>
                            <option value="Nuevo Leon">Nuevo Leon</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Street address" 
                            onChange={onStreetAddrChange} 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="number"
                            placeholder="Zip code" 
                            onChange={onZipCodeChange} 
                            required
                        />
                    </Form.Group>
                    <Button
                        className="mt-3 mb-2" 
                        variant="flat" 
                        bg='flat' 
                        type="submit"
                        style={globalStyles.primaryButton}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
            <p>Or login <Link to="/login">here</Link></p>
        </Container>
    )
}

const styles = {
	loginCard: {
		margin: 'auto',
		width: '500px'
	},
	loginContainer: {
		textAlign: 'center'
	},
	loginTitle: {
		marginTop: '170px',
		marginBottom: '45px',
		color: colors.dark,
		fontSize: '65px',
	}
}

export default SignupView;