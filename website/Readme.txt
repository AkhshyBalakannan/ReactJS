React Infos

Prerequisite:
    latest version of node
    use nvm to manage multiple node versions

To Create React App use the below command
    npx create-react-app <app-name>

React Components
    Components Contains
        Template - JSX
        Logic

Component Function should start with Captial letter
    Babel converts JSX into HTML

JSX
    class is called by className

Older version < 16 
    Needs importing React 
        import React from 'react'

Version above > 17 doesn't need importing react

To Comment a line inside template use {/* */}

All React Component file should have a default export <function-name> to use it in another Component
Here its completely JSX not javascript so dont use - instead camelcase it 
    background-color => backgroundColor

To load dynamic value inside the return statement we have use {}
    function App() {
        const title = 'Dynamic Title';

        return (
            <h1>{ title }</h1>
        );
    }

We can only load Int, Strings, Arr datatypes as dynamic value to template, where as trying to load Boolean or Objects doesn't work
    Below Code Doesn't compile
        function App() {
            const titleObj = { title: 'Dynamic Title' };
            const tryBool = false;
            return (
                <h1>{ titleObj }</h1>
                <h2>{ tryBool }</h2>
            );
        }

Check the below code sample for more details datatypes that can be used
    function App() {
        const title = 'Welcome to the new blog';
        const likes = 50;
        // const person = { name: 'akhshy', age: 24 };
        const link = 'http://www.google.com';

        return (
            <div className="App">
            <div className="content">
                <h1>{ title }</h1>
                <p>Liked { likes } times</p>

                {/* <p>{ person }</p> */}

                <p>{ 10 }</p>
                <p>{ "hello, ninjas" }</p>
                <p>{ [1,2,3,4,5] }</p>
                <p>{ Math.random() * 10 }</p>

                <a href={link}>Google Site</a>
            </div>
            </div>
        );
    }

Now we may not need all the content to be in same file itself
say as here we may not need className="content" to stay in the App.js we may need new component 

To create new component create a file <component-name>.js
    Basic Concept here is to have a function and default export function at end of the page

    import the sub component in parent and use it as html tag no declarations need direct import and call it inside template return statement

        import Navbar from './Navbar';
        import Home from './Home';

        function App() {
        return (
            <div className="App">
            <Navbar />
            <div className="content">
                <Home />
            </div>
            </div>
        );
        }

        export default App;

// We can use normal function notation or even arrow functions

    const Navbar = () => {
    return (
        <nav className="navbar">
        <h1>The Dojo Blog</h1>
        <div className="links">
            <a href="/">Home</a>
            <a href="/create">New Blog</a>
        </div>
        </nav>
    );
    }
    
    export default Navbar;


Styles
    Basically in react css is not scoped to that one component
    So we can use an index.css a base css sheet to hold all our css and import it in index.js file

    We also have ability to hold inline css below

    <a href="/create" style={{ 
        color: 'white', 
        backgroundColor: '#f1356d',
        borderRadius: '8px' 
    }}>New Blog</a>

    the above styles can be written in const and can be called here inside style
    be carefull we are inside JSX not in JS where we won't have ability to use - see example with background-color being said as backgroundColor


Click Events
    This is the basic concept where we need to know and do something when user clicks on something

    We have onClick event which can be used, basic concept here is we need to write a function and call the function
    The below code sample has two function where one is just to call one function
        another is to get data as args from the template and pass it to function to do something with args

    const Home = () => {
        const handleClick = (e) => {
            console.log('hello ninjas', e);
        }

        const handleClickAgain = (name, e) => {
            console.log('hello ' + name, e.target);
        }

        return (
            <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click me</button>
            <button onClick={(e) => handleClickAgain('mario', e)}>Click me again</button>
            </div>
        );
    }
    
    export default Home;

    We have an event access 'e' in onClick which can be used 

useState Hook
    Basic Concepts here is that when we declare variables in the component outside the template
    that can be used inside template to show dynamic data but whats important here is
        it doesn't gets updated in template when the data is updated inside Function
    
    So, to let react know this variable may change in time we need to use an state Hook

        useState is the actual hook name

    To use this useState we need to import it from react first and declare values inside the function as follows
        import { useState } from "react";

        const [name, setName] = useState('mario');

    Where the above const is the actual useState data which will update dynamically as data changes
        Here, we need to wrap the value inside array destructured with the actual name of the variable and
        function which will be used to update the value of the variable itself

    Entire example for this is below

        import { useState } from "react";

        const Home = () => {
        // let name = 'mario';
        const [name, setName] = useState('mario');
        const [age, setAge] = useState(25);

        const handleClick = () => {
            // name = 'luigi';
            setName('luigi');
            setAge(30);
        }

        return (
            <div className="home">
            <h2>Homepage</h2>
            <p>{ name } is { age } years old</p>
            <button onClick={handleClick}>Click me</button>
            </div>
        );
        }
        
        export default Home;

Outputting Lists
    Basic Concept here is when we have arrays of data and we want some for loop to 
        loop over the data inside array and output inside the template this array can be of any data types

    To Do this we will be using the default javascript loop function for arrays say as map
    The Main thing we have to note here is we need to have a key property which should be unique one 
        this key is for react to know and have a track of datas being rendered in templates, mainly used when data inside this array is changed

        const Home = () => {
            const [blogs, setBlogs] = useState([
                { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
                { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
                { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
            ])

            return (
                <div className="home">
                {blogs.map(blog => (
                    <div className="blog-preview" key={blog.id} >
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    </div>
                ))}
                </div>
            );
        }

Props
    Basic concept here is to send data to inner components with attributes
        Just similar to vuejs PROPS

    To Send data as props to child component two things are important
        one is to send data using attr while importing child component inside template
        two is accepting props inside the child component as args 

    const Parent = () => {
        const title = 'hello world';
        return (
            <div className='parent'>
                <ChildComp title={title} subTitle='inline props as str' />
            </div>
        );
    }

    export default Parent;

    const ChildComp = (props) => {
        let title = props.title;
        let { subTitle } = props;
        return (
            <div className='parent'>
                <h1>{ title }</h1>
                <h2>{ subTitle }</h2>
            </div>
        );
    }

    export default ChildComp;

    If you think the above method is little tomuch or maybe like having extra lines
        we can do this in one line by below code

        const ChildComp = ({ title, subTitle }) => {


we can also filter arrays in props attr and send it dynamically 
    const Parent = () => {
        const boo = [true, false, true];
        return (
            <div className='parent'>
                <ChildComp foo={ boo.filter(b => b) } />
                what above line does is it filters the array and returns only true values as props
            </div>
        );
    }

    export default Parent;


Props as functions
    Concept here is sending function as props to childComp

    No matter what dataType is being sent to child Component either Int, Str, Bool, Obj or even function can be sent

    const Parent = () => {
        const [title, setTitle] = useState('hello world');

        const updateTitle = (newTitle) => { setTitle(newTitle) }

        return (
            <div className='parent'>
                <ChildComp title={title} subTitle='inline props as str' updateTitle={ updateTitle } />
            </div>
        );
    }

    export default Parent;

    const ChildComp = ({ title, subtitle, updateTitle }) => {
        let title = props.title;
        let { subTitle } = props;
        return (
            <div className='parent'>
                <h1>{ title }</h1>
                <h2>{ subTitle }</h2>
                <button onClick={() => updateTitle('Updated Title')}>Click me to change title</button>
            </div>
        );
    }

    export default ChildComp;

useEffect Hook
    This Hook runs everytime when the template renders, we can put here any piece of code which you want to run 
        each time the page loads or renders the page again

    import { useState, useEffect } from 'react';

    const Home = () => {
        const [title, setTitle] = useState('Init Title');

        useEffect(() => {
            console.log('This will fire everytime page renders for example when click me is clicked this will also be fired')
        });
        return (
            <div>
                <button onClick={setTitle('Updated Title')}>Click me</button>
            </div>
        );
    }

    export default Home;


    // IMPORTANT //
        This hook should be used with care and also should never be used to update state variables
            because when we update state it will rerender the page which will again trigger useEffect function again will update state
            you can see where this goes, its an infinite loop where you need to take care
    

useEffect Hook Dependencies
    Basic concept is to have useEffect as created lifecycle hook same as vuejs
        useEffect(func, []);

    Here the empty array is the dependencies space where we can 

        leave it empty to be treated as created lifecycle hook

        have any useState variables inside this array to be triggered trigger only when variable updates

    import { useState, useEffect } from 'react';

    const Home = () => {
        const [title, setTitle] = useState('Init Title');

        useEffect(() => { console.log('fired only when title is updated') }, [title]);

        return (
            <div>
                <button onClick={setTitle('Updated Title')}>Click me</button>
            </div>
        );
    }

    export default Home;

useEffect Hook Clean-up
    Basic Concept is useEffect should only run functions when that particular component is being shown
        or being rendered in browser. For example, we will be using useEffect for useFetch custom component
        
        which will take some time to process those request from backend and if user clicks on another routes
        before this fetch request is completed it will throw an error 
            warning: can't perform a React state update on an unmounted component...
    
    So we will be introducing new Controller function named AbortController() and cleanup functions
        cleanup function is something which useEffect already has inbuilt, 
        For this cleanup function to work we just have to return a function at the end of useEffect func

    import { useEffect } from 'react';

    useEffect(() => {
        // AbortController function
        const abortCont = new AbortController();

        setTimeout(() => {
            console.log('fire after 1 sec')
        }, 1000);

        // cleanup function
        return () => abortCont.abort();
    }, [])

JSON Server 

    npx json-server --watch db.json --port 8000

    Need to have .json file in current directory and have json with a key which will be as the resource
        say as the table 

    {
        "table_name": [
            { 
                'id':1,
                'title':'First Test Title'
            },
            {
                'id':2,
                'title':'Second Test Title'
            }
        ]

    }

    where we will have the a local server which will be running with end points with the table_name

        http:localhost:8000/title_name - GET, POST, DELETE


Fetching Data with useEffect
    Core Concept here is to get the data using fetch lib
    
    we can use the useEffect as created lifecycle hook to run the function to call APIs

    useEffect(() => {
        fetch('http://localhost:8000/<end-point>')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
    }, [])

Conditional Rendering inside templates
    Concept here is to show conditional div to be rendered based on the state values
    the below code sample will get blog data and sent it to child component where it will use
        it to load few divs using map function
    
    This is completely easy to send data to child component without even this conditional Rendering
    but we would have an error that would be logged in browser saying the initial value for blog would be null
    which I already said is used inside the child component with map, so it throws error saying map is run against null value

    So, it avoid this type of errors we should only render elements with values and skip elements which doesn't have value at that point of time

    Here comes the conditional rendering more important where we can use && which stands for 'AND' in JS
        Which will only load the second attr when first attr is true or has some values to it
        by this we can avoid the error 'map against null'

    import { useEffect, useState } from "react";
    import BlogList from "./BlogList";

    const Home = () => {
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setBlogs(data);
        })
    }, [])

    return (
        <div className="home">
        { blogs && <BlogList blogs={blogs} /> }
        </div>
    );
    }
    
    export default Home;

Handling Fetch Errors
    Concept here is to handle all type errors that we may get from APIs
    we also can introduce an loading notation to show users our APIs getting called

    To show these loading <div> conditionally based on the concept in above topic

    Have a look at the below code

    import { useEffect, useState } from "react";
    import BlogList from "./BlogList";

    const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setBlogs(data);
                setError(null);
            })
            .catch(err => {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
            })
            }, 1000);
        }, [])

        return (
            <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { blogs && <BlogList blogs={blogs} /> }
            </div>
        );
    }
    
    export default Home;

Creating Custom Hook:
    Concept here to create separate hook which can be called in any component and can be used 
    which will trigger while we call this function

    In the above concept you would have seen we created function for fetching data inside useEffect Hook
    
    where we have simply called API using fetch and will have all the error handlings init which will be mostly
        common for all the fetch functions, so, inside our application we will create multiple fetch function and writing
        fetch logic with error handling again and again is repeating code, which should be avoided

    // IMPORTANT //
        To let react know we are creating custom hook we need to prefix 'use'

    Check the below code snippets to get an idea

    import { useEffect, useState } from "react";
    import BlogList from "./BlogList";
    import useFetch from "./useFetch";

    const Home = () => {
        const { error, isLoading, data: blogs } = useFetch('http://localhost:8000/blogs')

        return (
            <div className="home">
            { error && <div>{ error }</div> }
            { isLoading && <div>Loading...</div> }
            { blogs && <BlogList blogs={blogs} /> }
            </div>
        );
    }
    
    export default Home; 

-----------------------------------------------------------------------------

    import { useState, useEffect } from 'react';

    const useFetch = (url) => {

        
        const [data, setData] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            setTimeout(() => {
            fetch(url)
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                setIsLoading(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                // auto catches network / connection error
                setIsLoading(false);
                setError(err.message);
            })
            }, 1000);
        }, [url])

        return { data, isLoading, error };
    }
    
    export default useFetch;

-------------------------------------------------------------------------------

The below code will show the actual placement of those clean up and abortController func in real time

    import { useState, useEffect } from 'react';

    const useFetch = (url) => {
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const abortCont = new AbortController();

            setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                console.log('fetch aborted')
                } else {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
                }
            })
            }, 1000);

            // Code Cleanup // abort the fetch
            return () => abortCont.abort();
        }, [url])

        return { data, isPending, error };
    }
    
    export default useFetch;


----------------------------------------------------------------------------------

React Router

    Basic concepts here is to create routes for react completely based on react-router-dom@5

    Main players here are BrowserRouter as Router, Route, Switch
        Where Router is the entire parent div which will take care of all route's
        Even now we can't make it working because we need need one more main component that is 
        switch which will take care of redirecting routes to each components

    The below code shows the structure of components, where you can see that <Home /> component is
        placed inside <Route path="/">--Component Name--</Route>


    One More main thing is why we use switch, here it serves very important purpose we can even use
        route component without switch, But we shouldn't be doing that because 
        
        Switch component is the one which will take care of rendering only one component at a time,
        For example what react does is it will come here to Router and check the paths for match 
            If we don't have switch what react does is it won't stop when it finds the match it tries
                to render other matching paths such as "/" and "/home" will be matched because both 
                routes have "/" in the starting

        Here, even if we use switch we have a problem where we won't be able to reach "/home" as for the 
            same reason mentioned above

        For this we need to have exact attribute in route to match the exact same

    import Navbar from './Navbar';
    import Home from './Home';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

    function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
    }

    export default App;

Router Links:
    Concept here is to create <a> tag which should not send request to server
    React should intecept the request and take control when user clicks on any links for redirecting

    We should use <Link> tag instead of <a>, Anyhow in browser it would be rendered as <a>
        here the link tag is also from react-router-dom library


    import { Link } from "react-router-dom";

    const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" style={{color: 'white', backgroundColor: '#f1356d' }}>
                    New Blog
                </Link>
            </div>
        </nav>
    );
    }
    
    export default Navbar;


Route Parameters
    Basic concept here is to have access to the url values such as id from url
    To do this we simply have to use the :id in path, which will be added inside router comp

    <Route path="/blogs/:id">
        <BlogDetails />
    </Route>

    we also need few steps that has to be done for the route-component to be access Parameters

    import { useParams } from "react-router-dom";

    const BlogDetails = () => {
        const { id } = useParams();

        return (
            <div className="blog-details">
            <h2>Blog details - { id }</h2>
            </div>
        );
    }

    export default BlogDetails;

----------------------------------------------------------------------

    import { Link } from 'react-router-dom';

    const BlogList = ({ blogs }) => {
        return (
            <div className="blog-list">
            {blogs.map(blog => (
                <div className="blog-preview" key={blog.id} >
                <Link to={`/blogs/${blog.id}`}>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                </Link>
                </div>
            ))}
            </div>
        );
    }
    
    export default BlogList;


Controlled Inputs
    Basic concept here is key-binds, we need to know what user has entered in input field,
        also have to update the value each time user types or clicks on that input or select fields

    To add we do it by using value attribute of input, and we need some function to update the value
        as we already know only the useState variables be updated only with set functions
        we will be using onChange function and use the e attr e.target values 
            onChange={(e) => setTitle(e.target.value)}


    import { useState } from "react";

    const Create = () => {
        const [title, setTitle] = useState('');
        const [body, setBody] = useState('');
        const [author, setAuthor] = useState('mario');

        return (
            <div className="create">
            <h2>Add a New Blog</h2>
            <form>
                <label>Blog title:</label>
                <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <button>Add Blog</button>
            </form>
            </div>
        );
    }
    
    export default Create;

Submit Event 
    we have to submit or sent the user entered data to backend for which we need onSubmit functions
        to do this we will use the onSubmit default attr of form element, we will call handleSubmit
        function inside this onSubmit attr which will be auto triggered when user submits the form
        we have access to e and we should first stop the default behaviour of refreshing the page, we
        do this using e.preventDefault() function and now we can do things we wanted with the data 

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name };
    }

    <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button>Submit</button>
    </form>

    Mostly we would be sent this data to backend for saving in our DB, So lets do that using fetch request

        const handleSubmit = (e) => {
            e.preventDefault();
            const data = { name };

            fetch('http://localhost:8000/users/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(() => {
                console.log('new data added');
            })
        }


Programmatic Redirects

    Basic concept here is redirect users inside our website without explicitly 
    asking users to click on any links, for example when user submits data we need to redirect them to home page

    To do this we will be using useHistory feature that the react-router-dom library 

    import { useHistory } from 'react-router-dom';
    import { useEffect } from 'react';

    const Create = () => {
        const history = useHistory();

        useEffect(() => {
            setTimeout(() => {
                // history.go(); -1 to go backward one time 
                // history.go(); 1 to go forward one time 

                history.go(-1);

                // we also have push method to redirect new components are some other routes

                history.push("/"); // which will redirect the url to home page

            }, 1000);
        }, []);
    }

    export default Create;


Delete using Fetch 
    Basic concept is fetch request to make delete request, the below code sample shows handleDelete function

    import { useHistory } from "react-router-dom";

    const DetailPage = ({ id }) => {
        const history = useHistory();

        const handleClick = () => {
            fetch('http://localhost:8000/data/' + id, {method: 'DELETE'})
            .then(() => {
                history.push('/');
            })
        }

        return (
            <div className="blog-details">
                <button onClick={handleClick}></button>
            </div>
        );
    }
    
    export default BlogDetails;


Not Found page
    Basic Concept is to catch all 404 urls inside our site to show notFound components
        To do this we simply have to match entire routes what ever maybe given in urls 
        We also should be more careful in placing this 404-route because it will be matched with 
            any sort of url patterns, So this 404-route should be only placed at the last 

    <Route path="*">
        <NotFound />
    </Route>


