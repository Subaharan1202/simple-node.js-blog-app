var mongoose= require("mongoose");
var express=require("express");
var bodyparser=require("body-parser");
var app=express();
var overide=require("method-override");
app.use(overide("method"));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/blog",{useNewUrlParser: true,useUnifiedTopology: true});
var myschema =new mongoose.Schema({
    
    title:String,
    imaage:String,
    body:String,
    created:{type:Date,default:Date.now()}
    
    
});

var blog =mongoose.model("blog",myschema);



//Routing 

app.get("/blog",function(req,res){
    
    blog.find({},function(err,blogs){
     if(err)   {console.log("error")}
     else{
       res.render("index",{blogs:blogs});   
     }
       
        
    });
    
    
}

);


//create

app.get("/blog/new",function(req,res){
    
   res.render("new") ;
    
    
});
app.post("/blog",function(req,res){
    
    var title=req.body.title
    var img=req.body.image
    var body=req.body.body
    
    blog.create({title:title,imaage:img,body:body});
    res.redirect("/blog");
});

//show
app.get("/blog/:id",function(req,res){
    
    
    
    blog.findById(req.params.id,function(err,blogs){
        
        if(err){
            console.log("not found post");
            
        }
        else{
            
          res.render("show",{blogs:blogs});  
        }
         
    });
  
  //update
  app.get("/blog/:id/edit",function(req,res){
      
      
      blog.findById(req.params.id,function(err,blog){
          
          if(err){
              console.log("error");
              
          }else{
              
              
          }
          res.render("edit",{blog:blog}); 
      });
     
      
      
  });
  
  
  
  //edit
  
  app.put("/blog/:id",function(req,res){
    
    var title= req.body.title
    var img=req.body.image
    var body=req.body.body
    
    blog.findByIdAndUpdate(req.params.id,{title:title,imaage:img,body:body},function(err,blog){
       
       if(err) {
           console.log("error");
       }
        else{
            res.redirect("/blog/"+req.params.id);
        }
        
    } );
    
      
  });
  
  
  
  
  
  
   
}
    
    );

app.listen(process.env.PORT,process.env.IP,function(err){
    console.log("server started");
});