<template>
  <header class="">
    <div class="row">
      <div class="col s12 m9 no-padding position_relative">
        <div class="blue darken-4 bookPreviewHeader z-depth-1">
          <h1 class="color-white no-margin font-size-3m heading_title"><b>Books</b></h1>
                <!-- Dropdown Trigger -->
                <!-- Dropdown meni iz koga se bira autor po kome filtriramo tabelu -->
                <a class='dropdown-trigger btn whiteborder transparent author_dropdown no-text-transform' data-target='dropdown0'>
                  <span id="triger_title">Any author</span>
                  <i class="material-icons right padding0007">arrow_drop_down</i>
                </a>

                <!-- Dropdown Structure -->
                <ul id='dropdown0' class='dropdown-content'>
                  <li v-for="author in bookAuthors" :key="author.id"><a v-on:click = "filterTable(author.name)"><i class="material-icons">person</i>{{author.name}}</a></li>
                </ul>
                <!-- Dugme na ciji klik odlazimo do forme za dodavanje nove knjige -->
            <a class="btn-floating btn-large waves-effect waves-light white add_button" v-on:click = "goToSaveNewBook()"><i class="material-icons" style="color:lime">add</i></a>
        </div>
      </div>

      <div class="col s12 m3 no-padding">
        <div class="bookPreviewHeader indigo darken-4 z-depth-1">
            <!-- Ime autora i knjige za book preview (nedostaje) -->
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="row">
      <div class="col s12 m3 push-m9">  
        <!-- debug: sort={{currentSort}}, dir={{currentSortDir}} -->
        <!-- Ostale informacije o knjizi za book preview (nedostaje) -->
      </div>

      <div class="col s12 m9 pull-m3">
        <table class="highlight" id="myTable">
          <thead>
            <tr>
              <!-- Tabela se sortira po tittle/pages klikom na ikonicu pored natpisa -->
                <th class="whiteborder"></th>
                <th v-on:click="sort('title')" class="gray_color cursor-pointer">
                  Title
                    <i class="material-icons" v-if="currentSort !== 'title'">sort</i>
                    <i class="material-icons" v-if="currentSort === 'title' && currentSortDir === 'asc' ">arrow_drop_down</i>
                    <i class="material-icons" v-if="currentSort === 'title' && currentSortDir === 'desc' ">arrow_drop_up</i>
                </th>
                <th class="gray_color">Author</th>
                <th class="center gray_color">Year</th>
                <th @click="sort('pages')" class="center gray_color cursor-pointer">
                  Pages
                    <i class="material-icons" v-if="currentSort !== 'pages'">sort</i>
                    <i class="material-icons" v-if="currentSort === 'pages' && currentSortDir === 'asc' ">arrow_drop_down</i>
                    <i class="material-icons" v-if="currentSort === 'pages' && currentSortDir === 'desc' ">arrow_drop_up</i>
                </th>
                <th class="center gray_color">Quantity</th>
                <th>     </th>
            </tr>
          </thead>
          <!-- Prikaz podataka -->
          <tbody>
            <tr v-for="book in sortedBooks" :key="book.id">
              <td class="center"><img src="../assets/book_photo.png" alt="bookPhoto" class="book-photo-size"></td>
              <td>{{book.title}}</td>
              <td class="gray_color">{{book.author}}</td>
              <td class="center gray_color">{{book.year}}</td>
              <td class="center gray_color">{{book.pages}}</td>
              <td class="center gray_color">{{book.quantity}}</td>
              <td>
                <!-- Klikom na ikonicu sa 3 tackice se dolazi do forme za update podataka -->
                <i class="material-icons gray_color cursor-pointer" v-on:click = "goToUpdateBook(book.id)">more_vert</i>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  </main>
  
</template>

<script>
import M from 'materialize-css'


export default {
  name: 'HomeView',

  data : function(){
    return{
      books:[],
      currentSort:'',
      currentSortDir:'asc',
      bookAuthors:[],
    }
  },

  mounted : function(){
    M.AutoInit()
        // var dropdown = document.querySelectorAll('.dropdown-trigger');
        // var instances = M.Dropdown.init(dropdown, {});

      //Dobavnjanje informacija o knjigama
      fetch('http://localhost:5000/books', {
      credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.books = data
          console.log("Ajde", this.books)
        
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      //Dobavljanje informacija o autorima
      fetch('http://localhost:5000/authors', {
      credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.bookAuthors = data
          console.log('Autori',this.bookAuthors);        
        })
        .catch((error) => {
          console.error("Error:", error);
        });

  },

  methods:{
    goToSaveNewBook: function () {
      this.$router.push("/savenewbook");
    },

    goToUpdateBook: function (id) {
      document.cookie = "bookID=" + id;
      this.$router.push("/updatebook");
    },

    filterTable : function(authorName){
      let x = document.getElementById("triger_title")
      x.innerHTML = authorName

      var filter, table, tr, td, i, txtValue,tbody;
      filter = authorName.toUpperCase();
      
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");

      for (var i = 1; i < tr.length; i++) {
        var tds = tr[i].getElementsByTagName("td");
        var flag = false;
        for(var j = 0; j < tds.length; j++){
          var td = tds[j];
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            flag = true;
          } 
        }
        if(flag){
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }

    },
    sort: function(s){
      if(s === this.currentSort){
        this.currentSortDir = this.currentSortDir === 'asc'?'desc':'asc';
      }
      this.currentSort = s;
    }

  },

  computed:{
    sortedBooks : function(){
      return this.books.sort((a, b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      });
    }
  },
  
}
</script>
