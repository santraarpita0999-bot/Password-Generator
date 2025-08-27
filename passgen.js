let lengthslider = document.getElementById("lengthslider");
let slidervalue = document.getElementById("slidervalue");
let password =document.getElementById("password");

let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");

let copyicon = document.getElementById("copyicon");

let genbtn = document.getElementById("genbtn");

//showing length slider value
slidervalue.textContent = lengthslider.value;
//work for length slider
lengthslider.addEventListener("input",()=>{
    slidervalue.textContent = lengthslider.value;
});
//work for generate button
genbtn.addEventListener('click',()=>{
    let pwd = generatePassword();
    password.value = pwd;
    evaluateStrength(pwd);
});

let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let nums = "0123456789";
let spacialChars = "~!@#$%^&*";

//function to generate password
function generatePassword (){
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? nums : "";
    allChars += symbols.checked ? spacialChars : "";

    if(allChars == "" || allChars.length == 0)
    {
        return genPassword;
    }

    for(let i=1;i<=lengthslider.value;i++)
    {
        genPassword += allChars.charAt(Math.floor
            (Math.random()*allChars.length));
    }
     return genPassword; 
}

function evaluateStrength(password) {
    let strengthIndicator = document.getElementById("strengthIndicator");

    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSymbol = /[~!@#$%^&*]/.test(password);
    let length = password.length;

    let strength = "";
    let strengthClass = "";

    if (length >= 12 && hasLower && hasUpper && hasNumber && hasSymbol) {
        strength = "Strong";
        strengthClass = "strength-strong";  //for color
    } else if (length >= 8 && ((hasLower && hasUpper) || (hasNumber && hasSymbol))) {
        strength = "Medium";
        strengthClass = "strength-medium";
    } else {
        strength = "Weak";
        strengthClass = "strength-weak";
    }

    strengthIndicator.textContent = `Strength: ${strength}`;
    strengthIndicator.className = `strength-indicator ${strengthClass}`;
}


copyicon.addEventListener('click',()=>{
    if(password.value != "" || password.value.length >=1)
    {
        navigator.clipboard.writeText(password.value);
        copyicon.innerText = "check";
        copyicon.title = "Password Copied";

        setTimeout(()=>{
            copyicon.innerText = "content_copy";
        },2000);
    }    
});


