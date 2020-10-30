var count = 0;
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
// function myFunction(element) {
//   var textField = document.createElement('textarea');
//   textField.innerText = element;
//   document.body.appendChild(textField);
//   textField.select();
//   document.execCommand("copy");
//   textField.remove();
//   alert("Copied Medicine Name: " + element);
// }
function addOtherFields(billIdx) {
  var input,
    filter,
    table,
    tr,
    td,
    i,
    txtValue,
    reqRow,
    reqExpiry,
    reqExpiry1,
    reqMRP;
  input = document.getElementById("medName" + billIdx);
  filter = input.value.toUpperCase();
  tableRef = document.getElementById("myTable");
  tr = tableRef.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        reqRow = tr[i];
        reqMRP = reqRow.getElementsByTagName("td")[3].innerText.substring(1);
        reqExpiry = reqRow.getElementsByTagName("td")[5].innerText;
        reqExpiry1 =
          reqExpiry.substring(6, 10) +
          "-" +
          reqExpiry.substring(0, 2) +
          "-" +
          reqExpiry.substring(3, 5);
        document.getElementById("medMRP" + billIdx).value = reqMRP;
        document.getElementById("medExpiry" + billIdx).value = reqExpiry1;
        document.getElementById("medQuantity" + billIdx).value = 0;
      } else {
      }
    }
  }
}
function calcTotal(billIdx) {
  var reqQuantity, reqMRP;
  reqQuantity = document.getElementById("medQuantity" + billIdx).value;
  reqMRP = document.getElementById("medMRP" + billIdx).value;
  if (reqQuantity <= 0) {
    document.getElementById("medQuantity" + billIdx).value = 0;
    document.getElementById("medTotal" + billIdx).value = 0;
  } else {
    document.getElementById("medTotal" + billIdx).value = reqMRP * reqQuantity;
  }
}
function calcBill() {
  document.getElementById("totalBillAmt").value = Number(0);
  var billTable = document
    .getElementById("billTable")
    .getElementsByTagName("tbody")[0];
  var numRow = billTable.getElementsByTagName("tr").length;
  for (let index = 0; index < numRow; index++) {
    const medCost = Number(document.getElementById("medTotal" + index).value);
    // console.log(medCost);
    if (!medCost) {
      console.log("Not a number");
      continue;
    } else {
      var curr = Number(document.getElementById("totalBillAmt").value);
      curr = curr + Number(medCost);
      document.getElementById("totalBillAmt").value = curr;
      document.getElementById("discount").max = curr - 1;
    }
  }
}

function calcFinalBill() {
  var actualTotal = document.getElementById("totalBillAmt").value;
  var discount = document.getElementById("discount").value;
  document.getElementById("finalTotalCost").value = actualTotal - discount;
}

$(".sliding-link").click(function (e) {
  e.preventDefault();
  var aid = $(this).attr("href");
  $("html,body").animate({ scrollTop: $(aid).offset().top }, "slow");
});
function addMed(medIdStockId) {
  // console.log(medIdStockId);
  var medRow = document.getElementById(medIdStockId);
  // console.log(medRow);
  var medId = medRow.getElementsByTagName("td")[1].innerText;
  var medStockId = medRow.getElementsByTagName("td")[2].innerText;
  var medName = medRow.getElementsByTagName("td")[3].innerText;
  var medMRP = medRow.getElementsByTagName("td")[4].innerText;
  var medExpiry = medRow.getElementsByTagName("td")[6].innerText;
  var medExpiry1 =
    medExpiry.substring(6, 10) +
    "-" +
    medExpiry.substring(0, 2) +
    "-" +
    medExpiry.substring(3, 5);
  var billTable = document
    .getElementById("billTable")
    .getElementsByTagName("tbody")[0];
  var row = billTable.insertRow(count);
  row.setAttribute("id", "BillMed" + medId + "Stock" + medIdStockId);
  var cell1 = row.insertCell(0);
  cell1.innerHTML =
    "<btn class='btn btn-dark btn-sm' onclick='removeMed(" +
    count +
    ");'><i class='fas fa-trash'></i></btn>";
  var cell2 = row.insertCell(1);
  cell2.innerHTML = 1 + Number(count);
  var cell3 = row.insertCell(2);
  cell3.innerHTML =
    "<input id='medName" +
    count +
    "' name='medName" +
    count +
    "' readonly class='form-control-plaintext' type='text' oninput='addOtherFields('" +
    count +
    "');' value='" +
    medName +
    "'>";
  var cell4 = row.insertCell(3);
  cell4.innerHTML =
    "<input id='medId" +
    count +
    "' name='medId" +
    count +
    "' readonly class='form-control-plaintext' type='number' value='" +
    medId +
    "'>";
  var cell5 = row.insertCell(4);
  cell5.innerHTML =
    "<input id='medStockId" +
    count +
    "' name='medStockId" +
    count +
    "' readonly class='form-control-plaintext' type='number' value='" +
    medStockId +
    "'>";
  var cell6 = row.insertCell(5);
  cell6.innerHTML =
    "<input id='medMRP" +
    count +
    "' name='medMRP" +
    count +
    "' class='form-control-plaintext' type='number' readonly step='0.1' value='" +
    medMRP +
    "'>";
  var cell7 = row.insertCell(6);
  cell7.innerHTML =
    "<input id='medQuantity" +
    count +
    "' name='medQuantity" +
    count +
    "' type='number' class='form-control' min='1' oninput='calcTotal(" +
    count +
    ");' required>";
  var cell8 = row.insertCell(7);
  cell8.innerHTML =
    "<input id='medExpiry" +
    count +
    "' name='medExpiry" +
    count +
    "' type='date' class='form-control-plaintext' readonly value='" +
    medExpiry1 +
    "'>";
  var cell9 = row.insertCell(8);
  cell9.innerHTML =
    "<input id='medTotal" +
    count +
    "' name='medTotal" +
    count +
    "' type='number' class='form-control-plaintext' readonly step='0.1'>";
  ++count;
}
function removeMed(rowNo) {
  --count;
  document
    .getElementById("billTable")
    .getElementsByTagName("tbody")[0]
    .deleteRow(rowNo);
  var table = document
    .getElementById("billTable")
    .getElementsByTagName("tbody")[0];
  var tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; ++i) {
    tr[i].cells[1].innerHTML = i + 1;
    for (var j = 2; j < 9; ++j) {
      var inputId = tr[i].cells[j].getElementsByTagName("input")[0].id;
      tr[i].cells[j].getElementsByTagName("input")[0].id =
        inputId.substring(0, inputId.length - 1) + i;
      tr[i].cells[j].getElementsByTagName("input")[0].name =
        inputId.substring(0, inputId.length - 1) + i;
    }
    tr[i].cells[2]
      .getElementsByTagName("input")[0]
      .setAttribute("oninput", "addOtherFields(" + i + ")");
    tr[i].cells[6]
      .getElementsByTagName("input")[0]
      .setAttribute("oninput", "calcTotal(" + i + ")");

    tr[i].cells[0]
      .getElementsByTagName("btn")[0]
      .setAttribute("onclick", "removeMed(" + i + ")");
  }
}
