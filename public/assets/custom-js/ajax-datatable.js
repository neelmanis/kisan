var table;

$(document).ready(function(){
  $('#btn-filter').click(function(e){ 
    e.preventDefault();
    table.ajax.reload();  
});

$('#btn-reset').click(function(e){ 
    e.preventDefault();
    $('#form-filter')[0].reset();
    table.ajax.reload(); 
  });
});

function dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns){
  table = $("#"+tableName).DataTable({ 
    // "paging": paging,
    "scrollX": scrollX,
    "scrollY": scrollY,
    "processing": processing, 
    "serverSide": serverside,
    "order": [], 
    "bSort": false,
    "ajax": {
      "url": `${window.location.origin}/`+recordURL,
      "type": "POST",
      "data": filterData
    },
    "columnDefs": [columns],
    dom: 'Bfrtip',
    buttons: []
  });
  return table;
}
