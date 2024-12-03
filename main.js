//display Book1 & Book 2
renderedBooks1();
renderedBooks2();

var form = document.getElementById("inputBook");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var judul   = document.getElementById("inputjudul").value;
    var date   = document.getElementById("inputdate").value;
    var jam  = document.getElementById("inputjam").value;
    var ket    = document.getElementById("inputket").value;
    var status  = document.getElementById("inputBookIsComplete").checked;

    var listBook1 = localStorage.getItem('books1') ? localStorage.getItem('books1') : JSON.stringify([]);
    var listBook2 = localStorage.getItem('books2') ? localStorage.getItem('books2') : JSON.stringify([]);
    //save to local storage
    var dataObject = {
        "judul" : judul,
        "date" : date,
        "jam": jam,
        "ket"  : ket,
        "status": status
    };

    if( status == true )
    {
        listBook1 = JSON.parse(listBook1);
        listBook1.push(dataObject);

        localStorage.setItem('books1', JSON.stringify(listBook1));
        renderedBooks1();

    }else{
        listBook2 = JSON.parse(listBook2);
        listBook2.push(dataObject);

        localStorage.setItem('books2', JSON.stringify(listBook2));
        renderedBooks2();
    }

});

//display completeBookshelfList
function renderedBooks1()
{
    var list = "";
    var dt   = localStorage.getItem('books1') ? localStorage.getItem('books1') : JSON.stringify([]);
        dt   = JSON.parse(dt);    
    var l = dt.length;
    for(i=0;i<l;i++)
    {
        list += '<article class="book_item">\
                <h3>'+ dt[i]['judul'] +'</h3>\
                <p>Jam: '+ dt[i]['jam'] +'</p>\
                <p>Tanggal: '+ dt[i]['date'] +'</p>\
                <p>Keterangan: '+ dt[i]['ket'] +'</p>\
                <div class="action">\
                    <button class="green" data-index="'+i+'" onclick="belumSelesaiBaca(this)" data-info="'+ escapeHtml(JSON.stringify(dt[i]))+'">Jadwal Belum selesai </button>\
                    <button class="red hapus-buku-1" data-index="'+i+'" onclick="hapus1(this)">Hapus Jadwal</button>\
                </div>\
                </article>';
    }

    document.getElementById("completeBookshelfList").innerHTML = list;

}

//display incompleteBookshelfList
function renderedBooks2()
{
    var list = "";
    var dt   = localStorage.getItem('books2') ? localStorage.getItem('books2') : JSON.stringify([]);
        dt   = JSON.parse(dt);
    var l = dt.length;
    for(i=0;i<l;i++)
    {
        list += '<article class="book_item">\
                <h3>'+ dt[i]['judul'] +'</h3>\
                <p>Jam: '+ dt[i]['jam'] +'</p>\
                <p>Tanggal: '+ dt[i]['date'] +'</p>\
                <p>Keterangan: '+ dt[i]['ket'] +'</p>\
                <div class="action">\
                    <button class="green" data-index="'+i+'" onclick="selesaiBaca(this)" data-info="'+ escapeHtml(JSON.stringify(dt[i])) +'">Jadwal Selesai </button>\
                    <button class="red hapus-buku-2" data-index="'+i+'" onclick="hapus2(this)">Hapus Jadwal</button>\
                </div>\
                </article>';
    }

    document.getElementById("incompleteBookshelfList").innerHTML = list;
}

function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function selesaiBaca(e)
{
    var index   = e.getAttribute("data-index");
    var info    = e.getAttribute("data-info");
        info    = JSON.parse(info);

    //remove form book2
    var dataBook2= localStorage.getItem('books2') ? localStorage.getItem('books2') : JSON.stringify([]);
        dataBook2= JSON.parse(dataBook2);
        dataBook2.splice(index,1);
    localStorage.setItem('books2', JSON.stringify(dataBook2) );

    //add into books1
    var dataBook1= localStorage.getItem('books1') ? localStorage.getItem('books1') : JSON.stringify([]);
        dataBook1= JSON.parse(dataBook1);
        dataBook1.push(info);
    localStorage.setItem('books1', JSON.stringify(dataBook1));
    renderedBooks1();
    renderedBooks2();
}

function belumSelesaiBaca(e)
{
    var index   = e.getAttribute("data-index");
    var info    = e.getAttribute("data-info");
        info    = JSON.parse(info);

    //remove from book1
    var dataBook1= localStorage.getItem('books1') ? localStorage.getItem('books1') : JSON.stringify([]);
        dataBook1= JSON.parse(dataBook1);
        dataBook1.splice(index,1);
    localStorage.setItem('books1', JSON.stringify(dataBook1) );

    //add into books2   
    var dataBook2= localStorage.getItem('books2') ? localStorage.getItem('books2') : JSON.stringify([]);
        dataBook2= JSON.parse(dataBook2);
        dataBook2.push(info);
    localStorage.setItem('books2', JSON.stringify(dataBook2) );
    renderedBooks1();
    renderedBooks2();
}

function hapus1(e)
{
    var index    = e.getAttribute("data-index");
    var dataBook1= localStorage.getItem('books1') ? localStorage.getItem('books1') : JSON.stringify([]);
        dataBook1= JSON.parse(dataBook1);
    dataBook1.splice(index,1);
    localStorage.setItem('books1', JSON.stringify(dataBook1) );
    renderedBooks1();
}

function hapus2(e)
{
    var index    = e.getAttribute("data-index");
    var dataBook2= localStorage.getItem('books2') ? localStorage.getItem('books2') : JSON.stringify([]);
        dataBook2= JSON.parse(dataBook2);
    dataBook2.splice(index,1);
    localStorage.setItem('books2', JSON.stringify(dataBook2) );
    renderedBooks2();
}


var search = document.getElementById("searchBook");
search.addEventListener("submit", function(e) {
    e.preventDefault();
    // Declare variables
    var input, filter, book1, list, book2, list2, h3, i, txtValue;
    input   = document.getElementById("searchBookTitle");
    filter  = input.value.toUpperCase();
    book1   = document.getElementById("completeBookshelfList");
    list    = book1.getElementsByTagName("article");
    book2   = document.getElementById("incompleteBookshelfList");
    list2   = book2.getElementsByTagName("article");

    // Loop through all article rows, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
        h3 = list[i].getElementsByTagName("h3")[0];
        if (h3) {
            txtValue = h3.textContent || h3.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
        }
    }

    // Loop through all article rows, and hide those who don't match the search query
    for (i = 0; i < list2.length; i++) {
        h3 = list2[i].getElementsByTagName("h3")[0];
        if (h3) {
            txtValue = h3.textContent || h3.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            list2[i].style.display = "";
        } else {
            list2[i].style.display = "none";
        }
        }
    }
});

 