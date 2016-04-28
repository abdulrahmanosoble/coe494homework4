
$(document).ready(function(){
var questions;
    $.ajax({
       type: "GET",
       url: "http://localhost:5984/quiz/426b3880858d1f9769a4c3cf09000651/?jsonp=callback",
       dataType : 'jsonp',
       contentType: "application/json",
       jsonpCallback: 'callback',
       success : function(data){
            console.log(data); 
            questions = data.questions;
            func();
        }
    })
    
function func()
    {
    
var form = document.getElementsByTagName("form")[0];
questions.forEach(function(question, index){
    if(question.type == "multiple")
    {
        var label = document.createElement("div");
        var title = document.createTextNode(question.title);
        var text = document.createTextNode(question.text);
        var bold = document.createElement("b");
        bold.appendChild(title);
        label.appendChild(bold);
        label.appendChild(document.createElement("br"));
        label.appendChild(text);
        label.appendChild(document.createElement("br"));  
        question.choices.forEach(function(choice,idx){
            var input = document.createElement("input");
            input.setAttribute("type","radio");
            input.setAttribute("name","question"+index);
            input.setAttribute("value",choice.text);
            input.setAttribute("correct",choice.isCorrect ? "true" : "false");
            label.appendChild(input);    
            label.appendChild(document.createTextNode(choice.text));
            label.appendChild(document.createElement("br"));
        });
        form.appendChild(label);
    }
    else if(question.type == "truefalse")
    {
        var label = document.createElement("div");
        var title = document.createTextNode(question.title);
        var text = document.createTextNode(question.text);
        var bold = document.createElement("b");
        bold.appendChild(title);
        label.appendChild(bold);
        label.appendChild(document.createElement("br"));
        label.appendChild(text);
        label.appendChild(document.createElement("br"));
        
        var input = document.createElement("input");
        input.setAttribute("type","radio");
        input.setAttribute("name","question"+index);
        input.setAttribute("value","true");
        input.setAttribute("correct",question.answer ? "true" : "false");
        label.appendChild(input);    
        label.appendChild(document.createTextNode("True"));
        label.appendChild(document.createElement("br"));

        var input = document.createElement("input");
        input.setAttribute("type","radio");
        input.setAttribute("name","question"+index);
        input.setAttribute("value","false");
        input.setAttribute("correct", question.answer ? "true" : "false");
        label.appendChild(input);    
        label.appendChild(document.createTextNode("False"));
        label.appendChild(document.createElement("br"));
        
        form.appendChild(label);
    }
    
    
});
var submit = document.createElement("input");
submit.setAttribute("type","button");
submit.setAttribute("value","submit");
submit.setAttribute("onclick","process()");
form.appendChild(submit);
    

    
    
function process(){
var result = document.createElement("div");
var nodes = Array.prototype.slice.call(form.getElementsByTagName("div"),0);
nodes.forEach(function(group,index){
    var correct = false;
    var title = group.getElementsByTagName("b")[0];
    var nodelist = Array.prototype.slice.call(group.getElementsByTagName("input"),0);
    nodelist.forEach(function(ans,index){
        if(ans.getAttribute("correct") == "true" && ans.checked)
            correct = true;
    });
    var bold = document.createElement("b");
    bold.appendChild(document.createTextNode(title.innerHTML));
    result.appendChild(bold);
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createTextNode(correct ? "Correct Answer" : "Wrong Answer"));
    result.appendChild(document.createElement("br"));
    result.appendChild(document.createElement("br"));
});
    document.getElementsByTagName("body")[0].innerHTML = result.innerHTML; 
}
    }
});