
$(document).ready(function(){
var questions;
    $.ajax({
       type: "GET",
       url: "http://localhost:5984/quiz/426b3880858d1f9769a4c3cf09000651/?jsonp=callback",
       dataType : 'jsonp',
       contentType: "application/json",
       jsonpCallback: 'callback',
       success : function(data){
            console.log(data.questions); 
            questions = data.questions;
            func();
        }
    })
    
function func()
{
    
var form = document.getElementsByTagName("form")[0];
questions.forEach(function(question, index){
    var list = document.createElement("ons-list");
    var listHeader = document.createElement("ons-list-header");
    var bold = document.createElement("b");
    bold.appendChild(document.createTextNode(question.title));
    listHeader.appendChild(bold);
    listHeader.appendChild(document.createTextNode(": " + question.text));
    list.appendChild(listHeader);
    
    
    
    if(question.type == "multiple")
    {
        
        question.choices.forEach(function(choice,idx){
            var item = document.createElement("ons-list-item");
            item.setAttribute("modifier", "tappable");
            var label = document.createElement("label");
            label.setAttribute("class", "radio-button radio-button--list-item")
            item.appendChild(label);
            var input = document.createElement("input");
            input.setAttribute("type","radio");
            input.setAttribute("name",question.title);
            label.appendChild(input);
            var div = document.createElement("div");
            div.setAttribute("class","radio-button__checkmark radio-button--list-item__checkmark");
            label.appendChild(div);
            label.appendChild(document.createTextNode(choice.text));
            list.appendChild(item);
        });
    }
    
    form.appendChild(list);
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