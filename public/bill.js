var count=0;
function searchMedicine() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchMedicine");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function myFunction(element) {
  var textField = document.createElement('textarea');
  textField.innerText = element;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
  alert("Copied Medicine Name: " + element);
}
function addOtherFields(billIdx){
  var input, filter, table, tr, td, i, txtValue, reqRow, reqExpiry, reqExpiry1, reqMRP;
  input = document.getElementById("medName"+billIdx);
  filter = input.value.toUpperCase();
  tableRef = document.getElementById("myTable");
  tr = tableRef.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        reqRow = tr[i];
        reqMRP = reqRow.getElementsByTagName("td")[3].innerText.substring(1,);
        reqExpiry = reqRow.getElementsByTagName("td")[5].innerText;
        reqExpiry1 = reqExpiry.substring(6,10) + '-' + reqExpiry.substring(0,2) + '-' + reqExpiry.substring(3,5);
        document.getElementById('medMRP'+billIdx).value = reqMRP;
        document.getElementById('medExpiry'+billIdx).value = reqExpiry1;
        document.getElementById('medQuantity'+billIdx).value = 0;
      } else {

      }
    }       
  }
}
function calcTotal(billIdx){
  var reqQuantity, reqMRP;
  reqQuantity = document.getElementById('medQuantity'+billIdx).value;
  reqMRP = document.getElementById('medMRP'+billIdx).value;
  if (reqQuantity<=0){
    document.getElementById('medQuantity'+billIdx).value = 0;
    document.getElementById('medTotal'+billIdx).value = 0;
  }else{
    document.getElementById('medTotal'+billIdx).value = reqMRP*reqQuantity;
  }

}
function calcFinalBill(){
  document.getElementById('totalBillAmt').value = Number(0);
  var billTable = document.getElementById('billTable').getElementsByTagName('tbody')[0];
  var numRow = billTable.getElementsByTagName("tr").length;
  for (let index = 0; index < numRow; index++) {
    const medCost = Number(document.getElementById('medTotal'+index).value);
    console.log(medCost);
    if (!medCost) {
      console.log("Not a number");
      continue;
    } else{
      var curr = Number(document.getElementById('totalBillAmt').value);
      curr = curr + Number(medCost);
      document.getElementById('totalBillAmt').value = curr;
    }
  }
}
$(".sliding-link").click(function(e) {
  e.preventDefault();
  var aid = $(this).attr("href");
  $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
});
function addMed(medIdStockId){
  console.log(medIdStockId);
  var medRow = document.getElementById(medIdStockId);
  console.log(medRow);
  var medName = medRow.getElementsByTagName("td")[3].innerText;
  var medMRP = medRow.getElementsByTagName("td")[4].innerText;
  var medExpiry = medRow.getElementsByTagName("td")[6].innerText;
  var medExpiry1 = medExpiry.substring(6,10) + '-' + medExpiry.substring(0,2) + '-' + medExpiry.substring(3,5);
  var billTable = document.getElementById('billTable').getElementsByTagName('tbody')[0];
  var row = billTable.insertRow(count);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = count+1;
  var cell2 = row.insertCell(1);
  cell2.innerHTML = "<input id='medName" + count + "' class='form-control' type='text' oninput='addOtherFields('" + count + "');' value='" + medName + "'>";
  var cell3 = row.insertCell(2);
  cell3.innerHTML = "<input id='medMRP" + count + "' class='form-control' type='number' readonly step='0.1' value='" + medMRP + "'>";
  var cell4 = row.insertCell(3);
  cell4.innerHTML = "<input id='medQuantity" + count + "' type='number' class='form-control' min='1' oninput='calcTotal(" + count + ");'>";
  var cell5 = row.insertCell(4);
  cell5.innerHTML = "<input id='medExpiry" + count + "' type='date' class='form-control' readonly value='" + medExpiry1 + "'>";
  var cell6 = row.insertCell(5);
  cell6.innerHTML = "<input id='medTotal" + count + "' type='number' class='form-control' readonly step='0.1'>";
  ++count;
}