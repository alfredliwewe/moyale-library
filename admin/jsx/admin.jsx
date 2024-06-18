const {TextField,Button,Alert,ListItem,ListItemButton,ListItemIcon,ListItemText,Paper,Table,
    TableHead,ThemeProvider,createTheme,
    TableRow,Tabs, Tab,Box,Chip,Typography, FormLabel,Rating,DialogTitle,DialogActions,DialogContent,DialogContentText,
    TableCell,TablePagination,Drawer,Link,MenuItem,Dialog,Input,
    TableBody,Fab
} = MaterialUI;
const {useState,useEffect,useContext,createContext} = React;

const Context = createContext({});

let theme = createTheme({
    palette: {
        primary: {
            main: '#0052cc',
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

window.onload = function(){
    ReactDOM.render(<ThemeProvider theme={theme}><Index /></ThemeProvider>, document.getElementById("root"));
}

function Index(){
    const [page,setPage]= useState("Home"); //Home
    
    const menus = [
        {
            title:"Home",
            icon:"fa fa-home"
        },
        {
            title:"Subjects",
            icon:"fa fa-user-friends"
        },
        {
            title:"Books",
            icon:"fa fa-user-friends"
        },
        {
            title:"Students",
            icon:"fa fa-list-ul"
        },
        {
            title:"System Values",
            icon:"fa fa-list-ul"
        },
        {
            title:"Profile",
            icon:"fa fa-user"
        }
    ]
    return (
        <Context.Provider value={{page,setPage}}>
            <div className="w3-row">
                <div className="w3-col w3-border-right" style={{height:window.innerHeight+"px",overflow:"auto",width:"200px"}}>
                    <div className="w3-center pt-3 pb-3">
                        <img src={"../images/coat.png"} height="40" />
                    </div>
                    {menus.map((row,index)=>(
                        <MenuButton data={row} key={row.title} isActive={page == row.title} onClick={()=>setPage(row.title)} />
                    ))}
                    <MenuButton data={{title:"Logout",icon:"fa fa-power-off"}} isActive={false} onClick={()=>{
                        window.location = '../logout.php';
                    }} />
                </div>
                <div className="w3-rest" style={{height:window.innerHeight+"px",overflow:"auto"}}>
                    {page == "Home" ? <Home />:
                    page == "Subjects" ? <Subjects />:
                    page == "Books" ? <Books />:
                    page == "Students" ? <Students />:
                    page == "Staff" ? <Staff />:
                    page == "Languages" ? <Languages />:
                    page == "Packages" ? <MainPackages />:
                    <>{page}</>}
                </div>
            </div>
        </Context.Provider>
    )
}

function MenuButton(props){
    return (
        <>
            <div className={"p-2 hover:bg-gray-100 pointer menu-button "+(props.isActive?"bg-gray-100 active":"")} onClick={e=>{
                if(props.onClick != undefined){
                    props.onClick(e);
                }
            }}>
                <span className="w3-center" style={{width:"50px",display:"inline-block"}}>
                    <i className={props.data.icon} />
                </span>
                <font>{props.data.title}</font>
            </div>
        </>
    )
}

function Home(){
    const [data,setData] = useState({
        
    });
    const {page,setPage} = useContext(Context);

    const getData = () => {
        $.get("api/", {getDashboardData:"true"}, function(res){
            setData({...data, ...res});
        })
    }

    const numberFormat = (num) => {
        return new Intl.NumberFormat().format(num);
    }

    useEffect(()=>{
        getData();
    }, []);

    return (
        <>
            
        </>
    )
}

function Settings(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{minHeight:"unset"}}>
                        <Tab label="Words" icon={<i className="far fa-user" />} iconPosition="start" {...a11yProps(0)} sx={{minHeight:"unset"}}/>
                        <Tab label="Languages" icon={<i className="fa fa-list-ol" />} iconPosition="start" {...a11yProps(1)} sx={{minHeight:"unset"}} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Words />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AvailableLanguages />
                </TabPanel>
            </Box>
        </>
    )
}

function Books(){
    const [subjects,setSubjects] = useState([]);
    const [rows,setRows] = useState([]);
    const [open,setOpen] = useState({
        add:false,
        edit:true
    });

    const getLanguages = () => {
        $.get("api/", {getSubjects:"true"}, res=>setSubjects(res));
    }

    const saveWord = (event) => {
        event.preventDefault();

        post("api/", new FormData(event.target), response=>{
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Success");
                    getRows();
                    setOpen({...open, add:false});
                }
                else{
                    Toast(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const getRows = () => {
        $.get("api/", {getBooks:"true"}, res=>setRows(res));
    }

    useEffect(()=>{
        getLanguages();
        getRows();
    }, []);

    return (
        <>
            <Box sx={{p:2}}>
                <Button variant="contained" sx={{textTransform:"none"}} onClick={e=>setOpen({...open, add:true})}>Add Book</Button>
            </Box>
            <Paper sx={{m:2}}>
                <table className="w3-table w3-table-all" style={{minWidth:"100%"}}>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Title</td>
                            <td>Author</td>
                            <td>Image</td>
                            <td>Admin</td>
                            <td>Subject</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row,index)=>(
                            <tr>
                                <td>{index+1}</td>
                                <td>{row.title}</td>
                                <td>{row.author}</td>
                                <td>
                                    <img src={"../uploads/"+row.image} width={"28"} />
                                </td>
                                <td>{row.admin_data.name}</td>
                                <td>{row.subject_data.name}</td>
                                <td>
                                    <Button variant="outlined" sx={styles.smallBtn}>Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>

            <Dialog open={open.add} onClose={()=>setOpen({...open, add:false})}>
                <div className="w3-padding-large" style={{width:"400px"}}>
                    <CloseHeading label="Add book/resource" onClose={()=>setOpen({...open, add:false})}/>
                    <form onSubmit={saveWord}>
                        <TextField label={"Subject"} fullWidth size="small" name={"subject"} sx={{mt:2}} select>
                            {subjects.map((row,index)=>(
                                <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>
                            ))}
                        </TextField>

                        <TextField label={"Title"} fullWidth size="small" name={"new_book_title"} sx={{mt:2}} />
                        <TextField label={"Author"} fullWidth size="small" name={"author"} sx={{mt:2}} />
                        <TextField label={"Document File"} type="file" fullWidth size="small" name={"file"} sx={{mt:2}} />
                        
                        <Button variant="contained" sx={{mt:3}} type="submit">Submit</Button>
                    </form>
                    <BottomClose onClose={()=>setOpen({...open, add:false})}/>
                </div>
            </Dialog>
        </>
    )
}

function Subjects(){
    const [rows,setRows] = useState([]);
    const [active,setActive] = useState({});
    const [open,setOpen] = useState({
        add:false,
        edit:false
    });

    const getRows = () => {
        $.get("api/", {getSubjects:"true"}, res=>setRows(res));
    }

    const saveLanguage = (event) => {
        event.preventDefault();

        $.post("api/", $(event.target).serialize(), response=>{
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Success");
                    getRows();
                    setOpen({...open, add:false});
                }
                else{
                    Toast(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        });
    }

    useEffect(()=>{
        getRows();
    }, []);

    return (
        <>
            <Box sx={{p:2}}>
                <Button variant="contained" sx={{textTransform:"none"}} onClick={e=>setOpen({...open, add:true})}>Add Subject</Button>
            </Box>
            <Paper sx={{m:2}}>
                <table className="w3-table w3-table-all">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index)=>(
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            </Paper>

            <Dialog open={open.add} onClose={()=>setOpen({...open, add:false})}>
                <div className="w3-padding-large" style={{width:"400px"}}>
                    <CloseHeading label="Add Subject" onClose={()=>setOpen({...open, add:false})}/>
                    <form onSubmit={saveLanguage}>
                        <TextField label="Subject Name" fullWidth size="small" name="new_subject_name" sx={{mt:2,mb:3}} />
                        
                        <Button variant="contained" type="submit">Submit</Button>
                    </form>
                    <BottomClose onClose={()=>setOpen({...open, add:false})}/>
                </div>
            </Dialog>
        </>
    )
}

function Students(){
    const [rows,setRows] = useState([]);
    const [active,setActive] = useState({});
    const [open,setOpen] = useState({
        add:false,
        edit:false
    });

    const getRows = () => {
        $.get("api/", {getStudents:"true"}, res=>setRows(res));
    }

    const saveLanguage = (event) => {
        event.preventDefault();

        $.post("api/", $(event.target).serialize(), response=>{
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Success");
                    getRows();
                    setOpen({...open, add:false});
                }
                else{
                    Toast(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        });
    }

    useEffect(()=>{
        getRows();
    }, []);

    return (
        <>
            <Box sx={{p:2}}>
                <Button variant="contained" sx={{textTransform:"none"}} onClick={e=>setOpen({...open, add:true})}>Add Student</Button>
            </Box>
            <Paper sx={{m:2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Reg</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index)=>(
                            <TableRow hover>
                                <TableCell padding="none" sx={{pl:2}}>{index+1}</TableCell>
                                <TableCell padding="none">{row.name}</TableCell>
                                <TableCell padding="none">{row.phone}</TableCell>
                                <TableCell padding="none">{row.email}</TableCell>
                                <TableCell padding="none">{row.reg}</TableCell>
                                <TableCell padding="none">{row.status}</TableCell>
                                <TableCell sx={{padding:"7px"}}>
                                    <Button variant="contained" size="small">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open.add} onClose={()=>setOpen({...open, add:false})}>
                <div className="w3-padding-large" style={{width:"400px"}}>
                    <CloseHeading label="Add Student" onClose={()=>setOpen({...open, add:false})}/>
                    <form onSubmit={saveLanguage}>
                        <TextField label="Student Name" fullWidth size="small" name="new_student_name" sx={{mt:2}} />
                        <TextField label="Reg No." fullWidth size="small" name="reg" sx={{mt:2}} />
                        <TextField label="Phone" fullWidth size="small" name="phone" sx={{mt:2}} />
                        <TextField label="Email" fullWidth size="small" name="email" sx={{mt:2,mb:3}} />
                        
                        <Button variant="contained" type="submit">Submit</Button>
                    </form>
                    <BottomClose onClose={()=>setOpen({...open, add:false})}/>
                </div>
            </Dialog>
        </>
    )
}

function Profile(props){
    const [value, setValue] = React.useState(0);
    const [picture, setPicture] = React.useState(user.photo);
    const [modals, setModals] = useState({
        editEmail:false,
        editName:false
    });
    const [user2, setUser2] = useState({...user});
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const choosePicture = (event) => {
        let input = document.createElement("input");
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', function (event){
            //upload
            let formdata = new FormData();
            formdata.append("change_picture", input.files[0]);

            post("api/", formdata, function (response){
                try{
                    let res = JSON.parse(response);

                    if (res.status){
                        window.localStorage.setItem("user", response);
                        user = JSON.parse(window.localStorage.getItem("user"));
                        setPicture(user.photo);
                    }
                }
                catch (e) {
                    alert(e.toString()+response);
                }
            })
        });

        input.click();
    }

    const updateEmail = (event) => {
        $.post("api/", {updateEmail:user2.email}, function(res){
            if (res.status){
                Toast("Successfully updated email");
                setModals({...modals, editEmail:false});
                getUser();
            }
            else{
                Toast(res.message);
            }
        })
    }

    const getUser = () => {
        $.get("api/", {getCurrentUser:"true"}, function(res){
            setUser2(res);
            localStorage.setItem("user", JSON.stringify(res));
        })
    }

    const updateName = (event) => {
        $.post("api/", {updateName:user2.name}, function(res){
            if (res.status){
                Toast("Successfully updated name");
                setModals({...modals, editName:false});
                getUser();
            }
            else{
                Toast(res.message);
            }
        })
    }

    const changePassword = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", {admin_new_password:form.admin_new_password.value}, function(res){
            if(res.status){
                setOpen(false)
                Toast("Success");
            }
            else{
                Toast(res.message);
            }
        })
    }

    return (
        <div>
            <div className="w3-padding-large w3-large alert-warning text-dark">
                Your Profile
            </div>
            <div className="pt-30">
                <div className="w3-row">
                    <div className="w3-col m1">&nbsp;</div>
                    <div className="w3-col m3 pl-20 pr-20">
                        <img src={"../uploads/"+picture} width="100%" />
                    </div>
                    <div className="w3-col m8 pr-20 pl-20">
                        <Typography variant="h4" component="h1" gutterBottom>
                            {user.name}
                        </Typography>
                        <Link href="#" className="block">{user.type}</Link>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{mt:4}}>Rankings</FormLabel>
                        <div className="mb-40">
                            <font style={{display:"inline-block"}} className="w3-large">3.4</font> 
                            <Rating
                                name="text-feedback"
                                value={3.5}
                                readOnly
                                precision={0.5}
                                />
                        </div>
                        <div className="">
                            <Button variant="outlined" onClick={choosePicture} startIcon={<i className="fa fa-photo w3-small" />}>
                                Choose Picture
                            </Button>

                            <Button variant="contained" sx={{ml:3}} onClick={handleClickOpen} startIcon={<i className="fa fa-lock w3-small" />}>
                                Change password
                            </Button>
                        </div>
                        <div className="pt-30">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="About" icon={<i className="far fa-user" />} iconPosition="start" {...a11yProps(0)} />
                                        <Tab label="Activity Log" icon={<i className="fa fa-list-ol" />} iconPosition="start" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <FormLabel id="demo-radio-buttons-group-label">BASIC INFORMATION</FormLabel>
                                    <div className="w3-row pt-15">
                                        <div className="w3-col m2">
                                            <font className="bold">Email:</font>
                                        </div>
                                        <div className="w3-col m9">
                                            <Link href="#" onClick={e=>{
                                                setModals({...modals, editEmail: true});
                                            }
                                            }>{user2.email}</Link>
                                        </div>
                                    </div>
                                    <div className="w3-row pt-15">
                                        <div className="w3-col m2">
                                            <font className="bold">Name:</font>
                                        </div>
                                        <div className="w3-col m9">
                                            <Link href="#" onClick={e=>setModals({...modals, editName: true})}>{user2.name}</Link>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    Expired
                                </TabPanel>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    size="small"
                    >
                    <DialogTitle id="alert-dialog-title">
                        Change password
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            &nbsp;
                        </DialogContentText>
                        <form onSubmit={changePassword}>
                            <TextField
                                id="filled-password-input"
                                label="Enter new Password"
                                name="admin_new_password"
                                fullWidth
                                type="password"
                                sx={{mb:3, mt:2}}
                                size="small" />

                            <Button type="submit" role="submit" sx={{mt:2}} variant="contained">Save Changes</Button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className={"w3-modal"} style={{display:(modals.editEmail?"block":"none")}}>
                <div className={"w3-modal-content w3-round-large shadow w3-padding"} style={{width:"370px"}}>
                    <font className={"w3-large block"}>Edit Email</font>
                    <TextField label={"Change Email"} sx={{mt:3}} value={user2.email} onChange={e=>setUser2({...user2, email:e.target.value})} fullWidth size={"small"} />

                    <div className={"w3-row pt-30 pb-15"}>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"outlined"} onClick={e=>setModals({...modals, editEmail:false})}>Close</Button>
                        </div>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"contained"} onClick={updateEmail}>Update</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w3-modal"} style={{display:(modals.editName?"block":"none")}}>
                <div className={"w3-modal-content w3-round-large shadow w3-padding"} style={{width:"370px"}}>
                    <font className={"w3-large block"}>Edit Name</font>
                    <TextField label={"Change Name"} sx={{mt:3}} value={user2.name} onChange={e=>setUser2({...user2, name:e.target.value})} fullWidth size={"small"} />

                    <div className={"w3-row pt-30 pb-15"}>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"outlined"} onClick={e=>setModals({...modals, editName:false})}>Close</Button>
                        </div>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"contained"} onClick={updateName}>Update</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CloseHeading(props){
    return (
        <>
            <div className={"clearfix "+(props.className != undefined ? props.className : "")}>
                <font className="w3-large">{props.label}</font>

                <span className="bg-gray-200 w3-round-large bcenter float-right pointer hover:bg-gray-300" onClick={e=>{
                    if(props.onClose != undefined){
                        props.onClose(e);
                    }
                }} style={{height:"36px",width:"36px"}}>
                    <i className="fa fa-times text-lg"/>
                </span>
            </div>
        </>
    )
}

function BottomClose(props){
    return (
        <>
            <div className={"clearfix "+(props.className != undefined ? props.className : "")}>
                <Button variant="contained" color="error" className="float-right" onClick={e=>{
                    if(props.onClose != undefined){
                        props.onClose(e);
                    }
                }} style={{textTransform:"none"}}>
                    Close
                </Button>
            </div>
        </>
    )
}

function Warning(props){
    const [open,setOpen] = useState(true);

    useEffect(()=>{
        if(!open){
            if(props.onClose!= undefined){
                props.onClose();
            }
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={()=>{
            setOpen(false)
            if(props.onClose!= undefined){
                props.onClose();
            }
        }}>
            <div className="w3-padding-large" style={{width:"300px"}}>
                {props.title != undefined && <font className="w3-large block mb-30 block">{props.title}</font>}

                {props.secondaryText != undefined && <font className="block mb-15">{props.secondaryText}</font>}

                {props.view != undefined && <div className="py-2">{props.view}</div>}
                
                <div className="py-2 clearfix">
                    <Button variant="contained" color="error" className="w3-round-xxlarge" sx={{textTransform:"none"}} onClick={event=>{
                        setOpen(false)
                        if(props.onClose!= undefined){
                            props.onClose();
                        }
                    }}>Close</Button>
                    <span className="float-right">
                        
                        {props.action != undefined && <Button sx={{textTransform:"none"}} className="w3-round-xxlarge" variant="contained" onClick={event=>{
                            //setLogout(false);
                            props.action.callback();
                        }}>{props.action.text}</Button>}
                    </span>
                </div>
            </div>
        </Dialog>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

function post(url, formdata, callback){
    var ajax = new XMLHttpRequest();

    var completeHandler = function(event) {
        const contentType = ajax.getResponseHeader("Content-Type");
        console.log(contentType);
        if (contentType == "application/json") {
            try{
                callback(JSON.parse(event.target.responseText));
            }
            catch(E){
                console.error(E.toString());
                console.error("Failed to parse: "+event.target.responseText);
            }
        }
        else{
            var response = event.target.responseText;
            callback(response);
        }
    }
    
    var progressHandler = function(event) {
        //try{return obj.progress(event.loaded, event.total);}catch(E){}
    }
    
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    //ajax.addEventListener("error", errorHandler, false);
    //ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
}