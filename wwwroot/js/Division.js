$("#data-divisions").DataTable({
    ajax: {
        
        url: "https://localhost:7159/api/Division",
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
            data:"Id",

        },
        {
            data:"Name",
        },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="detailsDivision('${data.Id}')">
                         Details
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editDivision('${data.Id}')">
                         Edit
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteDivision('${data.Id}')">
                         Delete
                        </button>`;
            }
        },

    ],
    dom: 'Bfrtip',
    buttons: [
        'colvis',
        'excel',
        'print']
});


function newDivisions() {
    let data;
    let Id = 0;
    let Name = $('#DivisionName').val();

    data = {
        "Id": Id,
        "Name": Name
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7159/api/Division/',
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

function detailsDivision(Id) {
    $.ajax({
        url: `https://localhost:7159/api/Division/Id?Id=${Id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `<input type="hidden" class="form-control" id="hidenId" readonly placeholder="" value="0">
                <p> Id: <input type="text" class="form-control" id="Id" readonly placeholder="${res.Data.Id}" value="${res.Data.Id}">
                <p> Name: <input type="text" class="form-control" id="Name" readonly placeholder="${res.Data.Name}" value="${res.Data.Name}">
                `;
        $("#details").html(temp);
        console.log(res);
    }).fail((err) => {
        console.log(err);
    });
}

function editDivision(Id) {
    $.ajax({
        url: `https://localhost:7159/api/Division/Id?Id=${Id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `<input type="hidden" class="form-control" id="hidenId" readonly placeholder="" value="0">
                <p> Id: <input type="text" class="form-control" id="Id"  readonly placeholder="${res.Data.Id}" value="${res.Data.Id}">
                <p> Name: <input type="text" class="form-control" id="DivName" placeholder="${res.Data.Name}" value="${res.Data.Name}">
                `;
        $("#edit").html(temp);
        console.log(res);
    }).fail((err) => {
        console.log(err);
    });
}

function updateDivisions() {
    let data;
    let Id = parseInt($('#Id').val());
    let Name = $('#DivName').val()

    data = {
        "Id": Id,
        "Name": Name
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7159/api/Division/',
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

function deleteDivision(Id) {
    $.ajax({
        url: `https://localhost:7159/api/Division/Id?Id=${Id}`,
        method: "DELETE",
        dataType: 'json',
        success: function (message) {
            alert("Data Deleted" + message);
            location.reload();
        }
    })
}


