$(document).ready(function(){
    setInterval(() => {
        let currentDate = new Date();
        $("#clock").innerHTML = currentDate;
    }, 1000);
    
   const studentArray=[];
   const addStudent=function(student){
       addToList(student);
       addToArray(student);
       addToStorage(student);
   }
    function addToList(student){
        let newListItem="<li class=\"list-group-item\">" + student.studentId + "-" + student.firstName + "</li>";
        $("#listofstudents").append(newListItem);
    }
    function addToArray(student){
        studentArray.push(student);
    }
    const addToStorage = function(student) {
        let index = localStorage.length;
        localStorage.setItem(index, student.studentId + "-" + student.firstName);
    }


    const size = localStorage.length;
    if(size > 0) {
       
        for(let i=0; i<size; i++) {
            const localDataItem = localStorage.getItem(i);
            const studentId = localDataItem.substr(0,11);
            const firstName = localDataItem.substring(14);
            const objStudent = {
                "studentId": studentId,
                "firstName": firstName
            }; 
            addToList(objStudent);
            addToArray(objStudent);
        }
    } else {
        $.ajax({
            url:"data/students.json",
            type:"GET",
            datatype:"json"
        }).done(function(studentData){
            studentData.forEach(student => {
                addStudent(student)
            });
        }).fail(function(xhr, status, err) {
            alert("Error: " + status + " - " + err);
        }).always(function(xhr, status) {
            //alert( "The request is complete!" );
        });   
    }
    $("#formRegisterStudent").on("submit",function(e) {
        e.preventDefault();
        let studentId = formRegisterStudent.inputStudentID.value;
        let firstName = formRegisterStudent.inputFirstName.value;
        let objNewStudent={
             "studentId": studentId, 
             "firstName": firstName
        }
        addStudent(objNewStudent);
       formRegisterStudent.reset();
       
       $("#studentId").focus();
    });
    $("#studentId").focus();
});


