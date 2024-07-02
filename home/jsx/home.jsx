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
    const [stage,setStage] = useState("Books");
    const [user,setUser] = useState({});
    const [activeBook,setActiveBook] = useState({
        subject_data:{},
        admin_data:{}
    });
    const [menus,setMenus] = useState([
        {
            title:"Books",
            icon:"fa fa-books"
        },
        {
            title:"Profile",
            icon:"fa fa-user"
        }
    ])

    const getUser = () => {
        $.get("api/", {getUser:"true"}, res=>setUser(res));
    }

    useEffect(()=>{
        getUser();
    }, []);

    return (
        <Context.Provider value={{stage,setStage,user,setUser,activeBook,setActiveBook}}>
            <div className="w3-row">
                <div className="w3-col m2 w3-border-right" style={{height:innerHeight+"px",overflowY:"auto"}}>
                    <div className="p-2 mb-3">
                        <div className="p-3 rounded-xl" style={{background:"#d1e0d9"}}>
                            <center>
                                <img src="../images/default_avatar_dark.png" width={"50%"} style={{borderRadius:"50%"}}/>
                                <br/>
                                <br/>
                                <Typography variant="h6">{user.name}</Typography>
                            </center>
                        </div>
                    </div>

                    <div className="px-2">
                        {menus.map((row,index)=>(
                            <Button variant={row.title == stage ? "contained":"outlined"} onClick={e=>setStage(row.title)} sx={{mb:1}} fullWidth>{row.title}</Button>
                        ))}
                    </div>
                </div>
                <div className="w3-col m10" style={{height:innerHeight+"px",overflowY:"auto"}}>
                    {stage == "Books" ? <Home />:
                    stage == "View" ? <View />:
                    <>{stage}</>}
                </div>
            </div>
        </Context.Provider>
    )
}

function Home(){
    const [subjects,setSubjects] = useState([]);
    const [books,setBooks] = useState([]);
    const [subject,setSubject] = useState(0);
    const {stage,setStage,user,setUser,activeBook,setActiveBook} = useContext(Context);

    const getSubjects = () => {
        $.get("api/", {getSubjects:"true"}, res=>setSubjects(res));
    }

    const getBooks = () => {
        $.get("api/", {getBooks:"true"}, res=>setBooks(res));
    }

    useEffect(()=>{
        getSubjects();
        getBooks();
    }, []);

    return (
        <>
            <div className="p-3">
                <div className="py-2">
                    {subjects.map((row,index)=>(
                        <Chip label={row.name} variant={row.id != subject ? "outlined":"contained"} onClick={e=>setSubject(row.id)} color="primary" sx={{ml:1}} />
                    ))}
                </div>

                <div className="w3-responsive">
                    <div className="w3-row" style={{width:(books.length*200)+"px"}}>
                        {books
                        .filter(r=> subject == 0 || r.subject == subject)
                        .map((row,index)=>(
                            <BookView data={row} onClick={e=>{
                                setActiveBook(row);
                                setStage("View")
                            }} />
                        ))}
                    </div>
                </div>

                <Typography variant="h6" sx={{pl:3,py:2}}>Your reading history</Typography>
                <div className="w3-responsive">
                    <div className="w3-row" style={{width:(books.length*200)+"px"}}>
                        {books.map((row,index)=>(
                            <BookView data={row} onClick={e=>{
                                setActiveBook(row);
                                setStage("View")
                            }} />
                        ))}
                    </div>
                </div>

                <Typography variant="h6" sx={{pl:3,py:2}}>Trending books</Typography>
                <div className="w3-responsive">
                    <div className="w3-row" style={{width:(books.length*200)+"px"}}>
                        {books.map((row,index)=>(
                            <BookView data={row} onClick={e=>{
                                setActiveBook(row);
                                setStage("View")
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

function BookView(props){
    return (
        <>
            <div className="w3-col px-1" style={{width:"180px"}} onClick={e=>{
                if(props.onClick != undefined){
                    props.onClick(e);
                }
            }}>
                <img src={"../uploads/"+props.data.image} width={"100%"} className="rounded"/>
                <div className="pt-1">
                    <font className="block">{props.data.title}</font>
                    <font className="block w3-small w3-opacity">{props.data.author}</font>
                </div>
            </div>
        </>
    )
}

function View(){
    const {stage,setStage,user,setUser,activeBook,setActiveBook} = useContext(Context);
    return (
        <>
            <div className="w3-row">
                <div className="w3-col m3 p-3 w3-center">
                    <img src={"../uploads/"+activeBook.image} width={"80%"} className="rounded-xl" />
                </div>
                <div className="w3-col m9 py-5">
                    <div className="py-1">Title: <b>{activeBook.title}</b></div>
                    <div className="py-1">Author: <b>{activeBook.author}</b></div>
                    <div className="py-1">Subject: <b>{activeBook.subject_data.name}</b></div>
                    <div className="py-1 mb-3">Uploaded by: <b>{activeBook.admin_data.name}</b></div>

                    <Button onClick={e=>{
                        window.open("../uploads/"+activeBook.file, "_blank").focus();
                    }}>Read Now</Button>
                </div>
            </div>
        </>
    )
}