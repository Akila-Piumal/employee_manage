let baseUrl = "http://localhost:8080/api/v1/";

window.onload = function () {
    $('#desigSec').css('display', 'none');
    $('#addEmployeeSec').css('display', 'none');
};

$('#btnDesig').click(function () {
    $('#mainSec').css('display', 'none');
    $('#desigSec').css('display', 'block');
    $('#addEmployeeSec').css('display', 'none');
    loadAllDesignations();
})

$('#btnAdd').click(function (){
    $('#mainSec').css('display','none')
    $('#addEmployeeSec').css('display','block')
    loadAllEmployees();
})


// Designation section==================================================

// when click btnSave button in designations
$('#btnSaveDesig').click(function () {
    let desigName = $('#txtDesigName').val();
    let remark = $('#txtRemark').val();

    if (desigName===" " || remark===" "){
        $('#txtDesigName').focus();
    }else{
        let designation = {
            name: desigName,
            remark: remark
        }

        $.ajax({
            url: baseUrl + "designation",
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(designation),
            success: function (resp) {
                alert(resp.message);
                loadAllDesignations();
            },
            error: function (err) {
                console.log(err);
            }
        })
    }


})

// Load all designations to the table
function loadAllDesignations() {
    $.ajax({
        url: baseUrl + "designation",
        method: "get",
        success: function (resp) {
            $('#tblDesigBody').empty();

            for (var desig of resp.data) {
                $('#tblDesigBody').append(`
                <tr class="text-center" ondblclick="bindRowClickEvent(this)">
                    <td>${desig.designation_id}</td>
                    <td>${desig.name}</td>
                    <td>${desig.remark}</td>
                </tr>
            `)
                $("#tblDesigBody>tr").css('cursor', 'pointer');
            }

            $('#txtDesigName').val(" ");
            $('#txtRemark').val(" ");
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// when double click the row delte the designation
function bindRowClickEvent(obj) {
    let designationId = $(obj).children().eq('0').text();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url:baseUrl+"designation?designation_id="+designationId,
                method:"delete",
                success:function (resp){
                    loadAllDesignations();

                    Swal.fire(
                        'Deleted!',
                        'Employee has been deleted.',
                        'success'
                    )
                },
                error:function (error){
                    console.log("error");
                }
            })
        }
    })
}




//=============================================================================================
// Add Employee Section

$('#btnRefresh').click(function (){
    loadAllEmployees();
})

// Load all employees o the table
function loadAllEmployees() {
    $.ajax({
        url: baseUrl + "employee",
        method: "get",
        success: function (resp) {
            $('#tblEmployeeBody').empty();

            for (var employee of resp.data) {
                $('#tblEmployeeBody').append(`
                <tr class="text-center" ondblclick="bindEmployeeRowDblClickEvent(this)">
                    <td>${employee.employee}</td>
                    <td>${employee.designation}</td>
                    <td>${(employee.fullName.split(" ", 2))[0]}</td>
                    <td>${(employee.fullName.split(" ", 2))[1]}</td>
                    <td>${employee.dateOfJoining}</td>
                </tr>
            `)
                $("#tblEmployeeBody>tr").css('cursor', 'pointer');
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// When the double click the employee table row
function bindEmployeeRowDblClickEvent(obj){
    $("#editEmployeeModel").modal('show');

    loadDesignationsToTheCombo();

    let empId = $(obj).children().eq('0').text();
    let designation = $(obj).children().eq('1').text();
    let firstName = $(obj).children().eq('2').text();
    let lastName = $(obj).children().eq('3').text();
    let dateOfJoin = $(obj).children().eq('4').text();

    if (designation === "Manager"){
        $('#selectDesignation').append('<option value="Manager">Manager</option>');
    }else{
        $('#selectDesignation option[value="Manager"]').remove();
    }

    let split = dateOfJoin.split("T",2);

    $('#txtEmployeeId').val(empId);
    $('#txtFullName').val(firstName+" "+lastName);
    $('#selectDesignation').val(designation);
    $('#selectDate').val(split[0]);
    $('#btnDelete').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
    $('#btnNew').prop('disabled', true);
    $('#btnNew').css('color', 'black');
    $('#btnNew').css('background', 'white');
    $('#txtEmployeeId').prop('disabled', true);

    $('#btnDelete').css('background', '#FF4E4A');
    $('#btnDelete').css('color', 'white');

    $('#btnSave').css('background', '#03CD69');
    $('#btnSave').css('color', 'white');
}

// when click the add new button in Employee
$('#btnAddNew').click(function (){

    setNewEmployeeId();
    $('#selectDesignation option[value="Manager"]').remove();
    $('#btnDelete').prop('disabled', true);
    $('#btnDelete').css('color', 'black');
    $('#btnDelete').css('background', 'white');
    $('#btnSave').prop('disabled', true);
    $('#btnSave').css('color', 'black');
    $('#btnSave').css('background', 'white');
    $('#btnNew').prop('disabled', false);
    $('#btnNew').css('background', '#2517C2');
    $('#btnNew').css('color', 'white');
    $('#txtEmployeeId').prop('disabled', true);
    clearFields();
    loadDesignationsToTheCombo();
})

// set new employee id to the text field
function setNewEmployeeId(){
    $.ajax({
        url:baseUrl+"employee/last",
        method:"get",
        success:function (resp){
            $('#txtEmployeeId').val(resp.data.employee+1);
        },
        error:function (err){
            console.log(err)
        }
    })
}

// Load all designations from the table to combo box
function loadDesignationsToTheCombo(){
    $.ajax({
        url: baseUrl + "designation",
        async:false,
        method: "get",
        success: function (resp) {
            $('#selectDesignation').empty();
            //
            // $('#selectDesignation').append(`
            //         <option selected value="Open this select">Open this select menu</option>
            // `)

            for (var desig of resp.data) {
                $('#selectDesignation').append(`
                    <option value=${desig.name}>${desig.name}</option>
            `)
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}



//============================================================================
//Edit employee Model

// Save the employeee
$('#btnNew').click(function (){
    let fullName = $('#txtFullName').val();
    let designation = $('#selectDesignation').val();
    var isManager = $('#flexCheckDefault').prop('checked');
    var date = new Date($('#selectDate').val()).toISOString().replace('Z', '');

    let employee = {
        fullName: fullName,
        designation: designation,
        dateOfJoining:date,
        isManager:isManager
    }

    $.ajax({
        url:baseUrl+"employee",
        method:'post',
        contentType: 'application/json',
        data:JSON.stringify(employee),
        success:function (resp) {
            clearFields();
            $("#editEmployeeModel").modal('hide');
            loadAllEmployees();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 2500
            })
        },
        error:function (err) {
            alert("eror")
        }
    })
})

// update the emploee deatils
$('#btnSave').click(function (){
    let employeeId = $('#txtEmployeeId').val();
    let fullName = $('#txtFullName').val();
    let designation = $('#selectDesignation').val();
    var isManager = $('#flexCheckDefault').prop('checked');
    var date = new Date($('#selectDate').val()).toISOString().replace('Z', '');

    let employee = {
        employee:employeeId,
        fullName:fullName,
        designation:designation,
        dateOfJoining:date,
        isManager:isManager
    }

    $.ajax({
        url:baseUrl+"employee",
        method:'put',
        contentType: 'application/json',
        data:JSON.stringify(employee),
        success:function (resp) {
            clearFields();
            $("#editEmployeeModel").modal('hide');
            loadAllEmployees();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 2500
            })
        },
        error:function (err){
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    })

})

// Delete the employee
$('#btnDelete').click(function (){
    let employeeId = $('#txtEmployeeId').val();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url:baseUrl+"employee?employee_id="+employeeId,
                method:"delete",
                success:function (resp){
                    clearFields();
                    $("#editEmployeeModel").modal('hide');
                    loadAllEmployees();

                    Swal.fire(
                        'Deleted!',
                        'Employee has been deleted.',
                        'success'
                    )


                },
                error:function (error){
                    console.log("error");
                }
            })
        }
    })
})



// clear the text fields
function clearFields(){
    $('#txtEmployeeId').val("");
    $('#txtFullName').val("");
    $('#selectDesignation').val("Open this select");
    $('#selectDate').val("");
    $('#flexCheckDefault').prop('checked', false);
}

// Back Button
function backToMenu(){
    $('#desigSec').css('display', 'none');
    $('#mainSec').css('display', 'block');
    $('#addEmployeeSec').css('display', 'none');
}

