$(".reloadPage").click( () => {
    location.reload();
});


$("#addForm button").click(() => {

    $.ajax({
        url: '/api/Customers/',
        method: 'POST',
        data: {
            "FirstName": $("#addForm [name=FirstName]").val(),
            "LastName": $("#addForm [name=LastName]").val(),
            "Age": $("#addForm [name=Age]").val(),
            "Email": $("#addForm [name=Email]").val(),
            "Gender": $("#addForm [name=Gender]").val(),
        }

    })
        .done((result) => {


            console.log("Success!", result)

        })

        .fail((xhr, status, error) => {

            alert(`Fail! From Post in Main.js`)
            console.log("Error", xhr, status, error);

        })
});

$("#GetCustomersForm").ready(() => {

    $.ajax({
        url: '/api/Customers/GetCustomers',
        method: 'GET',

    })
        .done((result) => {

            console.log("Success!", result)

            $(".newRow").html('');

            for (let row in result) {
                let item = result[row]

                var table = $('<tr class="newRow">');
                table.append('<td>' + item.firstName + '</td>');
                table.append('<td>' + item.lastName + '</td>');
                table.append('<td>' + item.email + '</td>');
                table.append('<td>' + item.age + '</td>');
                table.append('<td>' + item.gender + '</td>');
                table.append('<td>' + '<button value="' + item.id + '"onclick="geteditOneCustomer(this.value)" >Edit</button>' + '</td>');
                table.append('<td>' + '<button value="' + item.id + '"onclick="Delete(this.value)">Delete</button>' + '</td>');
                $('#info').append(table);
            }
            
        })

        .fail((xhr, status, error) => {

            alert(`Fail!`)
            console.log("Error", xhr, status, error);


        })

    
});

function Delete(id) {

    $.ajax({
        url: '/api/Customers/',
        method: 'DELETE',
        data: {
            "Id": id
        }

    })
        .done((result) => {

            console.log("Deleted!", result)

        })

        .fail((xhr, status, error) => {

            alert(`Fail!`)
            console.log("Error", xhr, status, error);

        })
}




$("#buttonEditCustomer").click( () => {

    $.ajax({
        url: '/api/Customers/',
        method: 'PUT',
        data: {
            "FirstName": $("#editForm [name=FirstName]").val(),
            "LastName": $("#editForm [name=LastName]").val(),
            "Email": $("#editForm [name=Email]").val(),
            "Age": $("#editForm [name=Age]").val(),
            "Gender": $("#editForm [name=Gender]").val(),
            "Id": savedId
        }
    })
        .done(function (result) {
            success(result);
        })

        .fail(function (xhr, status, error) {
            fail(xhr, status, error);
        })
});


var savedId;
function geteditOneCustomer(id) {

    savedId = id;

    $.ajax({
        url: '/api/Customers/GetOneCustomer',
        method: 'GET',
        data: {
            "id": id,
        }
    })
        .done(function (customer) {

            $('#editTxtFirstName').val(customer.firstName);
            $('#editTxtLastName').val(customer.lastName);
            $('#editTxtEmail').val(customer.email);
            $('#editTxtAge').val(customer.age);
            $('#editTxtGender').val(customer.gender);

            $('#editCustomerButtonModal').modal('show');
        })

        .fail(function (xhr, status, error) {
            fail(xhr, status, error);
        })
}