'use strict'

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const blogData = require('./blog-service')
const app = express();
const stripJs = require('strip-js');
const authData = require('./auth-service')
const clientSessions = require('client-sessions')
require('dotenv').config()



//app use..
// Fixing the Navigation Bar to Show the correct "active" item
app.use(function (req, res, next) {
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    app.locals.viewingCategory = req.query.category;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// this serves static files..
app.use(express.static(__dirname + '/public'))

// This is a helper middleware function that checks if a user is logged in
// we can use it in any route that we want to protect against unauthenticated access.
// A more advanced version of this would include checks for authorization as well after
// checking if the user is authenticated
function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: process.env.CLIENT_SESSIONS_SK, // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

// the following custom middleware function ensures that all of our templates will have access to a "session" object(
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// seting up the handlebars
//custom handlebars helper

app.engine('.hbs', exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
        navLink: function (url, options) {
            return '<li' +
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        },
        safeHTML: function (context) {
            return stripJs(context);
        },
        formatDate: function (dateObj) {
            let year = dateObj.getFullYear();
            let month = (dateObj.getMonth() + 1).toString();
            let day = dateObj.getDate().toString();
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }
}));

app.set('view engine', '.hbs');


// setup a 'route' to listen on the default url path

app.get('/', (req, res) => {
    res.redirect('blog')
})
// The route "/about" must return the about.html file from the views folder
app.get('/about', (req, res) => {

    res.render('about');

});

// This route will return a JSON formatted string containing all of the posts within the posts.json file whose published property is set to true (i.e. "published" posts).
app.get('/blog', async (req, res) => {

    // Declare an object to store properties for the view
    let viewData = {};

    try {

        // declare empty array to hold "post" objects
        let posts = [];

        // if there's a "category" query, filter the returned posts by category
        if (req.query.category) {
            // Obtain the published "posts" by category
            posts = await blogData.getPublishedPostsByCategory(req.query.category);
        } else {
            // Obtain the published "posts"
            posts = await blogData.getPublishedPosts();
        }

        // sort the published posts by postDate
        posts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

        // get the latest post from the front of the list (element 0)
        let post = posts[0];

        // store the "posts" and "post" data in the viewData object (to be passed to the view)
        viewData.posts = posts;
        viewData.post = post;

    } catch (err) {
        viewData.message = "no results";
    }

    try {
        // Obtain the full list of "categories"
        let categories = await blogData.getCategories();

        // store the "categories" data in the viewData object (to be passed to the view)
        viewData.categories = categories;
    } catch (err) {
        viewData.categoriesMessage = "no results"
    }

    // render the "blog" view with all of the data (viewData)
    res.render("blog", { data: viewData })

});

// This is to ensure that individual blog posts can be rendered using the same layout as the main blog page. However, instead of displaying the latest blog post available / per category, we must instead show a specific blog post (by id).
app.get('/blog/:id', async (req, res) => {

    // Declare an object to store properties for the view
    let viewData = {};

    try {

        // declare empty array to hold "post" objects
        let posts = [];

        // if there's a "category" query, filter the returned posts by category
        if (req.query.category) {
            // Obtain the published "posts" by category
            posts = await blogData.getPublishedPostsByCategory(req.query.category);
        } else {
            // Obtain the published "posts"
            posts = await blogData.getPublishedPosts();
        }

        // sort the published posts by postDate
        posts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

        // store the "posts" and "post" data in the viewData object (to be passed to the view)
        viewData.posts = posts;

    } catch (err) {
        viewData.message = "no results";
    }

    try {
        // Obtain the post by "id"
        viewData.post = await blogData.getPostById(req.params.id);
    } catch (err) {
        viewData.message = "no results";
    }

    try {
        // Obtain the full list of "categories"
        let categories = await blogData.getCategories();

        // store the "categories" data in the viewData object (to be passed to the view)
        viewData.categories = categories;
    } catch (err) {
        viewData.categoriesMessage = "no results"
    }

    // render the "blog" view with all of the data (viewData)
    res.render("blog", { data: viewData })
});

// This route will return a JSON formatted string containing all the posts within the posts.json files
app.get('/posts', (req, res) => {

    if (req.query.category) {
        blogData.getPostsByCategory(req.query.category).then((data) => {

            res.render('posts', {
                posts: data
            });


        }).catch(err => { res.render("posts", { message: "no results" }); })
    }
    else if (req.query.minDate) {
        blogData.getPostsByMinDate(req.query.minDate).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }
    else {
        blogData.getAllPosts().then((data) => {
            if (data.length > 0) {
                res.status(200).render('posts', {
                    posts: data
                });

            } else {
                res.render("posts", { message: "no results" })
            }



        }).catch(() => {
            res.render('posts', { message: 'no result' })
        })
    }

})

// This route will return a JSON formatted string containing all the categories within the categories.json file
app.get('/categories', ensureLogin, (req, res) => {
    blogData.getCategories().then((data) => {
        if (data.length > 0) {
            res.status(200).render('categories', {
                categories: data
            });
        } else {
            res.status(500).render('categories', { message: 'no results' })
        }

    }).catch((err) => {
        res.status(500).render('categories', { message: 'no results' });
    })
});


// ===============================================================
//               Updated sections for 3rd assignment
// ===============================================================

// This enables us to store every file upload in our dashboard
// instead of our local file storage.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, /**include your cloud name */
    api_key: process.env.CLOUDINARY_API_KEY, /**include your Api Key */
    api_secret: process.env.CLOUDINARY_API_SK, /**include your Api secret */
    secure: true
});

// no { storage: storage } since we are not using disk storage
const upload = multer();

// adding the required addpost route
app.get('/posts/add', (req, res) => {
    blogData.getCategories().then(data => {
        res.status(200).render('addPost', { categories: data })
    }).catch(() => { res.render('addPost', { categories: [] }) })

})


// this correctly add the new blog post before redirecting the user to the /posts route
app.post('/posts/add', upload.single("featureImage"), (req, res) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            return result;
        }
        upload(req).then((uploaded) => {
            processPost(uploaded.url);
        });
    } else {
        processPost("");
    }
    function processPost(imageUrl) {
        req.body.featureImage = imageUrl;
        const formData = {
            body: req.body.body,
            title: req.body.title,
            postDate: new Date(),
            category: req.body.category,
            featureImage: req.body.featureImage,
            published: req.body.published
        };
        // 

        // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts
        blogData.addPost(formData).then(() => {
            res.status(200).redirect('/posts')
        }).catch((err) => {
            res.status(500).send("message : " + err)
        })


    }

})

// a url to enable us fetch a post by an Id..
app.get('/post/:value', (req, res) => {
    let id = req.params.value;
    blogData.getPostById(id).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).json({ message: err })
    })
})

// to "render" an "addCategory" view

app.get('/categories/add', (req, res) => {

    res.render('addCategory')
})


// This POST route is very similar to the logic inside the "processPost()" function within the current "/post/add" POST route - only instead of calling the addPost() blog-service function, this will instead call the newly created addCategory() function with the POST data in req.body
app.post('/categories/add', (req, res) => {


    blogData.addCategory(req.body).then(() => {
        res.status(200).redirect('/categories')
    }).catch((err) => {
        res.status(500).json({ message: "unable to add a category" })
    })


})


// This GET route will invoke your newly created deleteCategoryById(id) blog - service method.
app.get('/categories/delete/:id', (req, res) => {

    const id = req.params.id
    blogData.deleteCategoryById(id).then(
        res.status(200).redirect('/categories')
    ).catch(err => {
        res.status(500).json({ message: "Unable to Remove Category / Category not found" })
    })


})


// a route to enable us delete a post by an Id
app.get('/posts/delete/:id', (req, res) => {
    const id = req.params.id
    blogData.deletePostById(id).then(
        res.status(200).redirect('/posts')
    ).catch(() => {
        res.status(500).json({ message: "Unable to Remove Post / Post not found)" })
    })
})

//===================== Assignment 6 functionality =====================

// This "GET" route simply renders the "login" view without any data
app.get('/login', (req, res) => {
    res.render('login')
})

// This "GET" route simply renders the "register" view without any data
app.get('/register', (req, res) => {
    res.render('register')
})

// This "POST" route will invoke the authData.RegisterUser(userData) method with the POST data
app.post('/register', (req, res) => {

    authData.registerUser(req.body).then(() => {
        res.render('register', { successMessage: "User created" })
    }).catch(err => {
        res.render('register', { errorMessage: err, userName: req.body.userName })
    })
})

// set the value of the client's "User-Agent" to the request body, ie
app.post('/login', (req, res) => {
    req.body.userAgent = req.get('User-Agent')

    // invoking the authData.CheckUser(userData) method with the POST data
    authData.checkUser(req.body).then((user) => {
        req.session.user = {
            userName: user.userName,
            email: user.email,
            loginHistory: user.loginHistory
        }
        res.redirect('/posts');
    }).catch(err => {
        res.render('login', { errorMessage: err, userName: req.body.userName })
    })
})

// This "GET" route will simply "reset" the session

app.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/')
})

// This "GET" route simply renders the "userHistory" view without any data
app.get('/userHistory', (req, res) => {
    res.render('userHistory', { user: req.session.user })
})

// initialize..
blogData.initialize().
    then(authData.initialize)
    .then(() => {
        app.listen(HTTP_PORT, serverListener)
    }).catch(err => {
        console.log(err)
    })



// return the appropratie message..
const serverListener = (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Express http server listening on Port ${HTTP_PORT}`)
    }
}


// return the appropraite error message when a use key in a wrong url..
app.use((req, res) => {
    res.status(404).render('error')

});





