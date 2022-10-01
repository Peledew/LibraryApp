<template>
  <header>
    <nav>
    <div class="nav-wrapper blue darken-4">
      <a href="#"><i class="material-icons marginleft2" v-on:click = "goToHome()">arrow_back</i></a>
      <a href="#" class="brand-logo absolute3_5-3"><b>Add books</b></a>
    </div>
  </nav>
  </header>

  <main class="margin-l-5em">
    <div class="row">
      <div class="col s6">
        <div class="input-field">
          <label for="title">Title</label>
        <input id="title_input" type="text" class="validate" v-model="newBook.title">
        </div>
        
          
        <div class="input-field">
          <label for="author">Author</label>
          <input id="author_input" type="text" class="validate" v-model="newBook.author">
        </div>
        
        <div class="input-field">
          <label for="dateofbirth">Date of birth (Author)</label>
          <input id="dateofbirth_input" type="text" class="datepicker">
        </div>

        <div class="input-field">
          <label for="author">Number of pages</label>
          <input id="pagenumber_input" type="text" class="validate width11" v-model="newBook.pages">
        </div>
        

        <div class="input-field">
          <label for="author">Year of publishing</label>
          <input id="publishingyear_input" type="text" class="validate width11" v-model="newBook.year">
        </div>

        <div class="input-field">
          <label for="author">Quantity</label>
          <input id="quantity_input" type="text" class="validate width11" v-model="newBook.quantity">
        </div>

        
        <div class="file-field input-field">
          <div class="btn right marginleft3 white padding030 border-radius5 darkgrayborder z-depth-0" style="color:#616161">
            <span>Upload image</span>
            <input type="file">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
       </div>

      <a class="waves-effect waves-light btn indigo darken-3 border-radius5 padding030" v-on:click="saveBook()">SAVE BOOK</a>

      </div>
    </div>
  </main>

  
</template>


<script>

export default {
  name: 'AddBookView',

  data: function(){
    return{
        newBook:{},
        newAuthor:{
          dateOfBirth:"",
        },
    }
  },

  mounted(){
     var elems = document.querySelectorAll('.datepicker');
      M.Datepicker.init(elems, {
          format:'yyyy-mm-dd'
      });
  },
  methods:{
    // Cuvanje nove knjige
    saveBook : function(){
            fetch("http://localhost:5000/books",{
            method: "POST",
            credentials: 'include',
            headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            },  
            body: JSON.stringify(this.newBook),
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

            var temp;
            this.newAuthor.name = this.newBook.author
            temp =  M.Datepicker.getInstance(document.getElementById("dateofbirth_input"));
            this.newAuthor.dateOfBirth = temp.toString();

            fetch("http://localhost:5000/authors",{
            method: "POST",
            credentials: 'include',
            headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            },  
            body: JSON.stringify(this.newAuthor),
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

    onFile(e) {
      const files = e.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => (this.imgSrc = reader.result)
    },

    goToHome: function () {
      this.$router.push("/");
    },
  },

}
</script>