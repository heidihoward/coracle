var networkTable;

function createNetworkTable(){
      networkTable = $('#networkTable').DataTable({
      columns:  [
         {data: 'name'},
         {data: 'packets dispatched'},
         {data: 'packets received'},
         {data: 'packets dropped due to node failure'},
         {data: 'packets dropped due to partition or hub failure'},
         {data: 'packets inflight'},
         {data: 'number of servers'},
         {data: 'number of clients'},
         {data: 'number of startups'},
         {data: 'number of failures'},
         {data: 'number of recoveries'},
         {data: 'average latency'},
         {data: 'min latency'},
         {data: 'max latency'},
      ],
      render: function( data, type, full, meta){
              if (data == null){
                return '';
              }
              else{
                return JSON.stringify(data);
              }
            },
      responsive: false,
      "scrollX": true
    });
}

function addRowToNetworkTable(rowData){
  try{
    networkTable.row.add(rowData);
    networkTable.draw();
  }
  catch(exception){
    console.log('error adding row to network table:');
    console.log(exception);
  }
}