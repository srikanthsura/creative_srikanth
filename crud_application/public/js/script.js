var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        }
        else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["studentId"] = document.getElementById("student_id").value;
    formData["studentName"] = document.getElementById("student_name").value; 
    formData["email"] = document.getElementById("email").value;
    formData["class"] = document.getElementById("class").value;
    formData["year"] = document.getElementById("year").value;
    formData["city"] = document.getElementById("city").value;
    formData["country"] = document.getElementById("country").value;

    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.studentId;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.studentName;
    
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.class;
    
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.year;

    cell4 = newRow.insertCell(5);
    cell4.innerHTML = data.city;

    cell4 = newRow.insertCell(6);
    cell4.innerHTML = data.country;

    cell4 = newRow.insertCell(7);
    cell4.innerHTML =  `<a href="#" onclick="onEdit(this)">Edit</a>
                        <a href="#" onclick="onDelete(this)">Delete</a>`;

    ajaxcall(data);
}

function resetForm() {
    document.getElementById("student_id").value = "" ;
    document.getElementById("student_name").value = "" ;
    document.getElementById("email").value = "" ;
    document.getElementById("class").value = "" 
    document.getElementById("year").value = "" ;
    document.getElementById("city").value = "" ;
    document.getElementById("country").value = "" ;
    var selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("student_id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("student_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("class").value = selectedRow.cells[3].innerHTML;
    document.getElementById("year").value = selectedRow.cells[4].innerHTML;
    document.getElementById("city").value = selectedRow.cells[5].innerHTML;
    document.getElementById("country").value = selectedRow.cells[6].innerHTML;

}

function updateRecord(fortmData) {
    selectedRow.cells[0].innerHTML = fortmData.studentId;
    selectedRow.cells[1].innerHTML = fortmData.studentName;
    selectedRow.cells[2].innerHTML = fortmData.email;
    selectedRow.cells[3].innerHTML = fortmData.class;
    selectedRow.cells[4].innerHTML = fortmData.year;
    selectedRow.cells[5].innerHTML = fortmData.city;
    selectedRow.cells[6].innerHTML = fortmData.country;


}

function onDelete(td) {
    if(confirm('Are you sure delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById("studentList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true; 
    if (document.getElementById("student_id").value == ""){
        isValid = false;
        document.getElementById("studentNameValidationError").classList.remove("hide");
    }
    else{
        isValid = true;
        if (!document.getElementById("studentNameValidationError").classList.contains("hide")){
            document.getElementById("studentNameValidationError").classList.add("hide")
        }
    }
    return isValid
}
function ajaxcall(formData) {
    $.ajax({
        url: 'http://localhost:3000/studentDetails',
        type: "post",
        dataType: "json",
        data: formData,
        success: function (result) {
            console.log(result);
        }
    })
}