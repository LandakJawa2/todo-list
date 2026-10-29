const inputTugas = document.getElementById("inputTugas")
const tombolTambah = document.getElementById("tombolTambah")
const daftarTugas = document.getElementById("daftarTugas")
const totalTugas = document.getElementById("totalTugas");
const hapusSemua = document.getElementById("tombolHapusSemua")
const tombolHapusSelesai = document.getElementById("tombolHapusSelesai")

let tugas = [];

//-------------- simpan dan Muat ----------------

function simpan(){
    localStorage.setItem("tugas", JSON.stringify(tugas));

};

function muat(){
    const data = localStorage.getItem("tugas");
    if(data !== null){
        tugas = JSON.parse(data);
    };
};

// -------------- Tampilkan --------------------
function tampilkan(){
    daftarTugas.innerHTML = "";
    totalTugas.textContent = tugas.length;

    tugas.forEach(function (item,index){
        const li = document.createElement("li");
        if(item.selesai){
            li.classList.add("selesai");
        };

        const span = document.createElement("span");
        span.textContent = item.teks;
        span.addEventListener("click",function(){
            tugas[index].selesai = !tugas[index].selesai;
            simpan();
            tampilkan();
        });

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.classList.add("hapus");
        tombolHapus.addEventListener("click",function(){
            tugas.splice(index,1);
            simpan();
            tampilkan();
        })

        li.appendChild(span);
        li.appendChild(tombolHapus);
        daftarTugas.appendChild(li);
    });
}

// -------------- Tambah --------------------

function tambahTugas(){
    const teks = inputTugas.value.trim();
    if(teks === ""){
        alert("Tugas tidak boleh kosong!");
        return;
    };

    tugas.push({teks: teks, selesai: false});
    simpan();
    tampilkan();


    inputTugas.value = "";
    inputTugas.focus();

};

function hapusSelesai(){
    tugas = tugas.filter(function(item){
        return item.selesai === false;
    });
    simpan();
    tampilkan();
}

function hapusTugas(){
    if(daftarTugas.children.length === 0){
        alert("Tidak ada Tugas");
        return;
    };
    tugas = [];
    simpan();
    tampilkan();
};

tombolTambah.addEventListener("click",tambahTugas);
hapusSemua.addEventListener("click",hapusTugas);
tombolHapusSelesai.addEventListener("click", hapusSelesai);


inputTugas.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        tambahTugas()
    }
});

muat();
tampilkan();