
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const nodemailer = require('nodemailer')
const uname =''

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"0707dhanush123@gmail.com",
        pass:"smwipanrvizlkuub"
    }
})




const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '9943060731',
 database: 'login'
});









db.connect((err) => {
 if (err) throw err;
 console.log('Connected to database');
});



app.post('/', (req, res) => {
    let sql = 'SELECT * FROM log WHERE username=? AND password=?';
    let user = req.body.username;
    
    let pass = req.body.password;

    
    db.query(sql,[user,pass],(err, results) => {
        if (err) throw err;
        console.log(results);
        if(results.length>0){
            res.send(results);
        }
        else{
            res.send("fail");
        }
    });
   });
   app.get('/update/:username/:password', (req, res) => {
    let user = req.params.username;
    let pass = req.params.password;

    console.log(user,pass);
    let sql = 'UPDATE log SET status = 1 WHERE username=? AND password=?';
    db.query(sql,[user,pass],(err,result)=>{
        if(!err){
            console.log("success");
        }
        else{
            console.error(err);

        }
    })
  
   });
   app.get('/homecheck', (req, res) => {
    let sql = 'UPDATE log SET status = 0 WHERE status =?';
    let st = 1;
   
    db.query(sql,[st],(err, results) => {
        if (err) throw err;
        res.send("true")
        console.log(results);
       
    });
   });
   app.get('/homealter/:id', (req, res) => {
    let id = req.params.id;
    let sql = 'UPDATE log SET cid = ? WHERE status = 1'
    db.query(sql,[id],(err,result)=>{
        if (!err) {
             console.log('The data is inserted');
        }
        else{
            console.error(err);
        }
    })
   });

   app.get('/booking', (req, res) => {
     let sql = 'SELECT cid FROM log WHERE status=1';
     db.query(sql,(err,result)=>{
        if(!err){
            console.log('succes')
            console.log(result);
            res.send(result)
        }
        else{
            console.error(err);
        }
     })
   });

   app.get('/display/:centreid', (req, res) => {
    let id = req.params.centreid
    let sql = 'SELECT * FROM datalocat WHERE centreid=?';
    db.query(sql,[id],(err,result)=>{
       if(result.length>0){
        console.log(result)
        res.send(result)
       }
       else{
        res.send("fail");
       }
       
    })
  });

  app.get('/dosadd/:id/:dosid',(req,res)=>{
    let id=req.params.id;
    let dos = req.params.dosid;
    console.log(id,dos)
    let sql = "UPDATE datalocat SET dosage = dosage + ? WHERE centreid=?";
    db.query(sql, [dos,id],(err, result)=>{
        if (!err) {
            console.log("success")
            res.send("success")
        }
        else{
            console.error(err);
        }
    })
    

  })
  app.get('/sany/:searchany/:shany',(req,res)=>{
    let searchany = req.params.searchany
    let shany = req.params.shany
    
    console.log(searchany,shany)
   
    




})
app.post('/mail/:x/:name/:address',(req,res)=>{
 console.log('123');
 let x = req.params.x
 let name = req.params.name
 let loaction= req.params.location
 let address= req.params.address
 let time= req.params.time

 let mailOptions = {
    from:"0707dhanush123@gmail.com",
    to:x,
    subject:"nodemailer",
    Text: name
};
  
  transporter.sendMail(mailOptions,function(error,info){
    if(!error){
      console.log('邮件发送成功')  
      res.send("sucl")
      }else{
        console.error(error)}
  })
})














app.post('/signup',(req,res)=>{
    let sql="INSERT INTO log(username,password,emailid) VALUES(?,?,?)";
    let email = req.body.email;
    let user = req.body.user;
    let pass = req.body.pass;
    db.query(sql,[user,pass,email],(err,results)=>{
        if(!err) {
            res.send("success");
            console.log(results);
        }
        else {
            console.log(err);
        }
    })

})
app.post('/home',(req,res)=>{
    let search =  req.body.search;
    let sql = "SELECT * FROM datalocat WHERE location=?";
    db.query(sql,[search],(err,result)=>{
        if (result.length>0) {
            res.send(result);
            console.log(res);
        }
        else{
            res.send("fail")
            console.log("fail");
        }
    })

})
app.post('/adminhome',(req,res)=>{
    let search =  req.body.search;
    let sql = "SELECT * FROM datalocation WHERE loaction=?";
    db.query(sql,[search],(err,result)=>{
        if (!err) {
            res.send(result);
        }
        else{
            console.log("fail");
        }
    })

})
app.get('/home1',(req,res)=>{
    let sql = "SELECT * FROM datalocat";
    db.query(sql,(err,result)=>{
        if(err) throw err;
        return res.json(result);
        
    }
    )
})










app.get('/home2/:search',(req,res)=>{
    let sql = "SELECT * FROM datalocat WHERE location = ?";
    let search = req.params.search;
    console.log(search)
    db.query(sql,[search],(err,result)=>{
        if(err){
            
            console.log("fail")
        }
        else{
            res.send(result)
        }
        
    }
    )
})
app.get('/homeslot/:id',(req,res)=>{
    let sql = "UPDATE datalocat SET slot = slot - 1, dosage = dosage - 1 WHERE centreid=? ";
    let id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send("succes")
    }
    )
   
})
app.get('/homereset/:id',(req,res)=>{
    let sql = "UPDATE datalocat SET slot = 10 WHERE centreid=? ";
    let id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send("succes")
    }
    )
   
})
app.post('/sendid/:id',(req,res)=>{
    let id = req.params.id;
    let sql = "UPDATE log SET currentid = 1 WHERE status = 1"
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.error(err)
        }
        else{
            res.send(result);
        }
    })
    console.log(id)

})









app.post('/homeadding/:address/:location/:time/:name/:pincode/:closingtime/:dosage',(req,res)=>{
    let sql = "INSERT INTO datalocat(name, location,address,pincode ,optime ,cltime ,slot,dosage)values(?,?,?,?,?,?,10,?)";
 
    let address =req.params.address;
    let location = req.params.location;         
    let time = req.params.time;
    let name = req.params.name;
    let pin = req.params.pincode;
    let closetime = req.params.closingtime
    let dos = req.params.dosage;
    console.log(address,location,time,name,pin,closetime,dos);
    db.query(sql,[name,location,address,pin,time,closetime,dos],(err,result)=>{
        if(err){
            console.log(err);
            res.send.apply(res)
        }
        else{
        res.send("success")
        }
    })



   
   
})
app.delete('/homerem/:id', (req, res) => {
    let sql = "DELETE FROM datalocat WHERE centreid=?";
    let id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting record:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.affectedRows > 0) {
                res.send("success");
            } else {
                res.send("fail");
            }
        }
    });
});

app.get('/drop/:input',(req,res)=>{
    let sql = "SELECT * FROM datalocation WHERE loaction = ?";
    let search = req.params.input;
    console.log(search)
    db.query(sql,[search],(err,result)=>{
        if(err){
            console.log("fail")

        }
        else{
            res.send(result)
        }
        
    }
    )
    

})








app.listen('8081', () => {
 console.log('Server started on port 8081');
});