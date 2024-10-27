//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.

import webRoutes from "./auth_routes.js";

const constructorMethod = (app) =>{
    app.use("/",webRoutes);

    app.use("*",(req,res) => {
        res.status(404)
        res.render('error', {keywords: 'Page not found'})
    }) ;
};

export default constructorMethod;