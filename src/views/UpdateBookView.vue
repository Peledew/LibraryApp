<template>
  <header>
    <nav>
    <div class="nav-wrapper blue darken-4">
      <a href="#"><i class="material-icons marginleft2" v-on:click = "goToHome()">arrow_back</i></a>
      <a href="#" class="brand-logo absolute3_5-3"><b>Update book</b></a>
    </div>
  </nav>
  </header>

  <main class="margin-l-5em">
    <div class="row">
      <div class="col s6">

        <label for="title">Title</label>
        <input id="title_input" type="text" class="validate" v-model="bookForUpdate.title" readonly>

        <label>Author</label>
        <input id="author_input" type="text"  v-model="bookForUpdate.author" readonly>

        <label for="author">Number of pages</label><br>
        <input id="pagenumber_input" type="text" class="width11" v-model="bookForUpdate.pages" readonly><br>

        <label for="author">Year of publishing</label><br>
        <input id="publishingyear_input" type="text" class="width11" v-model="bookForUpdate.year" readonly><br>

        <label for="author">Quantity</label><br>
        <input id="quantity_input" type="text" class="width11" v-model="bookForUpdate.quantity"><br>


        
        <div class="file-field input-field">
          <div class="btn right marginleft3 white padding030 border-radius5 darkgrayborder z-depth-0 disabled" style="color:#616161">
            <span>Upload image</span>
            <input type="file" readonly>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" readonly>
          </div>
       </div>

      <a class="waves-effect waves-light btn indigo darken-3 border-radius5 padding030" v-on:click="updateBook()">UPDATE BOOK</a>

      </div>
    </div>
  </main>

  
</template>


<script>

export default {
  name: 'UpdateBookView',

  data: function(){
    return{
        bookForUpdate:{},
        bookID:{},
    }
  },

  mounted(){
    let x = document.cookie
    this.bookID = x.substring(7)

    fetch('http://localhost:5000/books/' + this.bookID, {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.bookForUpdate = data
          console.log("Ajde", this.books)
        
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  },
  methods:{
    updateBook : function(){
            fetch("http://localhost:5000/books/" + this.bookID,{
            method: "PUT",
            credentials: 'include',
            headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            },  
            body: JSON.stringify(this.bookForUpdate),
             })
            .then((response) => response.json)
            .then((data) => {
            console.log("New book : " + data);
            this.$router.push("/");
            })
            .catch((err) => {
            console.log("Error : " + err);
            alert(err);
            });
      
    },

    goToHome: function () {
      this.$router.push("/");
    },
  },

}
</script>