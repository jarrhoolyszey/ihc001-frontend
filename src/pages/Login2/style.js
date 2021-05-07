import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    width: '350px',
    backgroundColor: '#FFF',
    padding: '40px 10px',
  },
  header: {
    marginBottom: '40px',
  },
  loginForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    width: '80%',
  },
  loginButton: {
    marginTop: '50px',
    marginBottom: '10px',
    width: '80%',
  },
  forgotPassword: {
    fontSize: '10pt',
  }
});

export default useStyles;