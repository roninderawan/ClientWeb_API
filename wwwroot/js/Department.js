$("#data-departments").DataTable({
    ajax: {

        url: "https://localhost:7159/api/Department",
        dataSrc: "Data",
    },

    columns: [
        {
            data: null,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
        },
        {
            data: "Id",

        },
        {
            data: "Name",
        },
        {
            data: "DivisionID",
        },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="detailsDepartment('${data.Id}')">
                         Details
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editDepartment('${data.Id}')">
                         Edit
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteDepartment('${data.Id}')">
                         Delete
                        </button>`;
            }
        },
    ],
});

function newDepartments() {
    let data;
    let Id = 0;
    let Name = $('#DepartmentName').val();
    let DivisionID = parseInt($('#DivisionID').val());

    data = {
        "Id": Id,
        "Name": Name,
        "DivisionID": DivisionID
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7159/api/Department/',
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            Swal.fire(
                'Data Ditambahkan',
                'You clicked the button!',
                'success'
            )
            location.reload();
        }
    });
}

function detailsDepartment(Id) {
    $.ajax({
        url: `https://localhost:7159/api/Department/Id?Id=${Id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `<input type="hidden" class="form-control" id="hidenId" readonly placeholder="" value="0">
                <p> Id: <input type="text" class="form-control" id="Id" readonly placeholder="${res.Data.Id}" value="${res.Data.Id}">
                <p> Name: <input type="text" class="form-control" id="Name" readonly placeholder="${res.Data.Name}" value="${res.Data.Name}">
                <p> DivisionID: <input type="text" class="form-control" id="DivisionID" readonly placeholder="${res.Data.DivisionID}" value="${res.Data.DivisionID}">
                `;
        $("#details").html(temp);
        console.log(res);
    }).fail((err) => {
        console.log(err);
    });
}

function editDepartment(Id) {
    $.ajax({
        url: `https://localhost:7159/api/Department/Id?Id=${Id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `<input type="hidden" class="form-control" id="hidenId" readonly placeholder="" value="0">
                <p> Id: <input type="text" class="form-control" id="Id"  readonly placeholder="${res.Data.Id}" value="${res.Data.Id}">
                <p> Name: <input type="text" class="form-control" id="DeptName" placeholder="${res.Data.Name}" value="${res.Data.Name}">
                <p> DivisionID: <input type="text" class="form-control" id="DivisID" placeholder="${res.Data.DivisionID}" value="${res.Data.DivisionID}">
                `;
        $("#edit").html(temp);
        console.log(res);
    }).fail((err) => {
        console.log(err);
    });
}

function updateDepartments() {
    let data;
    let Id = parseInt($('#Id').val());
    let Name = $('#DeptName').val();
    let DivisionID = parseInt($('#DivisID').val());

    data = {
        "Id": Id,
        "Name": Name,
        "DivisionID": DivisionID
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7159/api/Department/',
        type: "PUT",
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            Swal.fire(
                'Data Diupdate',
                'You clicked the button!',
                'success'
            )
            location.reload();
        }
    });
}

function deleteDepartment(Id) {
    $.ajax({
        url: `https://localhost:7159/api/Department/Id?Id=${Id}`,
        method: "DELETE",
        dataType: 'json',
        success: function (message) {
            alert("Data Deleted" + message);
            location.reload();
        }
    })
}

