const express = require('express');



const bodyParser = require('body-parser')

const SettingsBill = require('./settings-bill')

const app = express();

const settingsBill = SettingsBill();

const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const PORT = process.env.PORT || 3011

app.listen(PORT,function(){

    console.log("App started at port:", PORT);
})


app.get('/',function(req, res){
    //var textColor = getTextColour()

   res.render('index', {
       
   settings: settingsBill.getSettings(),
   totals: settingsBill.totals(),
   textColor:settingsBill.getTextColour()
  });


});


app.post('/settings',function(req,res){
   
      settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel, 
     });

     //console.log(settingsBill.getSettings());
     //console.log(req.body);

    res.redirect('/');
    
 })

 app.post('/action',function(req,res){
   settingsBill.recordAction(req.body.actionType)
   settingsBill.colorChange()
    res.redirect('/');
})

app.get('/actions',function(req,res){

    res.render('actions', {actions: settingsBill.actions()})
})

app.get('/actions/:actionType',function(req,res){
    const actionType = req.params.actionType;
    res.render('actions', {actions: settingsBill.actionsFor(actionType)})
    
})

app.get('/aksie',function(req,res){

    res.render('aksie', {aksie: settingsBill.colorChange()})
})


