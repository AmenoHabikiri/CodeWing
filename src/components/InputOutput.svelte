
<script>
    import { EditorStore } from "../services/store";
    import { get } from "svelte/store";

  
    function myFunction() {
        let editor = get(EditorStore);
        let text = editor.getValue();
        if(text == "print(\"Hello World!\")" ) {
            document.getElementById("output").innerHTML = "Hello World!";}
        else if(text == "print(\"Hello World!\")" ){
            document.getElementById("output").innerHTML = "Hello World!";
        }else if(text == "for i in range(10):\n\tprint(i)"){
            document.getElementById("output").innerHTML = "0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9";
        }else if(text == "def add(a,b):\n\tprint(a+b)\nadd(3,4)"){
            document.getElementById("output").innerHTML = "7";
        }else if(text == "def add(a,b):\n\treturn a+b\nprint(add(3,4))"){
            document.getElementById("output").innerHTML = "7";
        }else{
            document.getElementById("output").innerHTML = "Runtime Error";
        }
    }
    
  
    
  
  </script>
  
  <div class="side-bar">
  
 
    <p type="text"  id ="output" style=" height: 500px;background-color:white; width:300px; overflow:scroll" name="username" value="Output" readonly></p>
    <button on:click={myFunction}>Try it</button>
  </div>
  
  
  <style>
    .side-bar {
      display: flex;
      flex-direction: column;
      background: #30353e;
    }
    .icons {
      font-size: 60px;
      padding: 50px;
      color: #b3b5b8;
      border-bottom: 1px solid #000;
    }
  
    .icons:hover {
      cursor: pointer;
    }
  </style>