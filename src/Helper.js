export function makeCsvFile(contents, name) {
  //I didn't know how to make a downloadable CSV so I used code found in this thread
  //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side

  console.log('making CSV');
  let csvContent = '';

  contents.forEach((contentString, index) => {
    csvContent += index < contents.length ? contentString + '\n' : contentString;
  });

  const fileName = name + 'download.csv';
  let mimeType = 'text/csv;encoding:utf-8';
  let a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([csvContent], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob([csvContent], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.location.href = 'data:application/octet-stream,' + encodeURIComponent(csvContent); // only this mime type is supported
  }
}