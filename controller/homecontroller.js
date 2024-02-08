const TodoLists = require('../models/todo_list')
module.exports.home = function(req,res){
    TodoLists.find({},function(err,todo){
        if(err){
            console.log('error in fetching data');
            return
        }
        return res.render('homePage',{
            title:"Home",
            todoList:todo
           
        })
    })
}
function DateValue(dueDate){
    let months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'] // static value for implementing monthe value
    newdate = '';
    let monapp = months[parseInt(dueDate[1]) - 1];
newdate = dueDate[2] + '-' + monapp + '-' + dueDate[0];
return newdate;}

module.exports.createTodo = function(req,res){
    dueDate =req.body.dateValue.split('-'); // splitting date and taking montha value
   let newdate='';
    newdate= DateValue(dueDate);     
    TodoLists.create({ // crating new todo and storing into DB
        desc:req.body.desc,
        category:req.body.category,
        dueDate: newdate
    },function(err,newArr){
        if(err){
            console.log('Oops error occoured');
            return;
        }
        return res.redirect('/')
    })
}
// function for deleting todo list
module.exports.deleteTodo = function(req,res){ 
    sp = req.query.id; // getting the id from ui
    newsp = sp.split(','); 
    for(let i=0;i<newsp.length;i++){ // looping over newsp  to delete all the checked value
        TodoLists.findByIdAndDelete(newsp[i],function(err){
            if(err){
                console.log('err')
                return;
            }
        })
    }
return res.redirect('/');
}
// function for fetching data for edit page
module.exports.EditPage = function(req,res){ // here we are fetching the data whic need to be edited
    TodoLists.findById(req.query.id,function(err,todoLists){
        if(err){ console.log('hi bro!! it an error'); return}
        return res.render('editPage',{
        title:'Edit Page',
        todolist:todoLists
        })
    })
}
// function for updatind tada after the todo is being edited
module.exports.editDetails = function(req,res){
    dueDate =req.body.dueDate.split('-'); // splitting date and taking montha value
    let newdate='';
    newdate= DateValue(dueDate);     
     TodoLists.updateOne({_id:req.query.id},{$set:{desc:req.body.desc,category:req.body.category,dueDate:newdate}} ,function(err,todoData){
        if(err){console.log('erroe while updating'); return}
        return res.redirect('/')
    })
}

