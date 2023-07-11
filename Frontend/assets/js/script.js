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



// when click btnSave button in designations
$('#btnSaveDesig').click(function () {
    let desigName = $('#txtDesigName').val();
    let remark = $('#txtRemark').val();

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

function bindRowClickEvent(obj) {
    let id = $(obj).children().eq('0').text();
    let name = $(obj).children().eq('1').text();
    let address = $(obj).children().eq('2').text();

    alert("Delete")
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

    console.log(dateOfJoin);

    let split = dateOfJoin.split("T",2);
    console.log(split[0])

    $('#txtEmployeeId').val(empId);
    $('#txtFullName').val(firstName+" "+lastName);
    $('#selectDesignation').val(designation);
    $('#selectDate').val(split[0]);
    $('#btnDelete').prop('disabled', false);
    $('#btnSave').prop('disabled', false);
}

// when click the add new button in Employee
$('#btnAddNew').click(function (){
    $('#selectDesignation option[value="Manager"]').remove();
    $('#txtEmployeeId').val("");
    $('#txtFullName').val("");
    $('#selectDesignation').val("Open this select");
    $('#selectDate').val("");
    $('#btnDelete').prop('disabled', true);
    $('#btnSave').prop('disabled', true);
})
