const {TextField,Button,Alert,ListItem,ListItemButton,ListItemIcon,ListItemText,Paper,Table,
    TableHead,Stack,Slider,
    TableRow,Tabs, Tab,Box,Chip,Typography, FormLabel,Rating,DialogTitle,DialogActions,DialogContent,DialogContentText,
    TableCell,TablePagination,Drawer,Link,MenuItem,Dialog,Input,
    TableBody,Fab,createTheme,ThemeProvider
} = MaterialUI;
const {useState,useEffect,useContext,createContext} = React;

const Context = createContext({});

let theme = createTheme({
    palette: {
        primary: {
            main: '#344e41',
        },
        secondary: {
            main: '#edf2ff',
        },
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius:"64px",
                    textTransform:"none",
                    padding:"6px 24px"
                }
            },
            defaultProps: {
                variant: 'contained', // Set the default variant to 'contained'
            },
        },
        MuiTab:{
            styleOverrides:{
                root:{
                    textTransform:"none",
                    minHeight:"unset"
                }
            }
        },
        MuiDialog:{
            styleOverrides:{
                root:{
                    borderRadius:"24px",
                    textTransform:"none"
                },
                paper:{
                    borderRadius:"16px"
                }
            }
        },
    }
});

const styles = {
    fab:{
        boxShadow:"none",
        background:"inherit"
    },
    btn:{
        textTransform:"none",
        lineHeight:"unset"
    },
    smallBtn:{
        textTransform:"none",
        lineHeight:"unset",
        padding:"5px 14px"
    }
}


window.onload = () => {
    ReactDOM.render(<ThemeProvider theme={theme}><Index /></ThemeProvider>, document.getElementById("root"));
}

function Index(){
    const [errors,setErrors] = useState({
        email:"",
        password:""
    });

    const login = (event) => {
        event.preventDefault();

        setErrors({
            email:"",
            password:""
        });

        $.post("api/", $(event.target).serialize(), response=>{
            try{
                let res = JSON.parse(response);
                if(res.status){
                    window.location = 'home/';
                }
                else{
                    setErrors({...errors, [res.type]:res.message});
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    return (
        <>
            <div className="" style={{width:"100%",position:"relative"}}>
                <img src="images/bg.jpg" width={"100%"} height={window.innerHeight} />
                <div className="bcenter" style={{position:"absolute",top:0,left:0,width:"100%",height:innerHeight+"px"}}>
                    <Paper className="w3-round-xlarge p-4" sx={{width:400}}>
                        <center>
                            <img src="images/coat.png" width={"50"}/>
                            <br/>
                            <br/>

                            <h4>Login</h4>
                        </center>

                        <form onSubmit={login}>
                            <TextField 
                                fullWidth 
                                size="small" 
                                label="Username / Phone" 
                                name="username_login" 
                                error={errors.email.length > 0}
                                helperText={errors.email}
                                sx={{mt:2}} />
                            <TextField 
                                fullWidth 
                                size="small" 
                                label="Password" 
                                name="password" 
                                type="password" 
                                error={errors.password.length > 0}
                                helperText={errors.password}
                                sx={{mt:2,mb:3}} />
                            <Button type="submit">Sign In</Button>
                        </form>

                        <div className="py-3 w3-center">
                            <font>&copy; Moyale</font>
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    )
}