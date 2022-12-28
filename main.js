var x;
status_m="";
objects=[];

function preload(){
    x=loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    cam=createCapture(VIDEO);
    cam.size(380,380);
    cam.hide();
    x.play();
}
function scan(){
    a = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML ="Detecting...";
}

function modelLoaded(){
    console.log("MODEL LOADED BEEP BOOP 🤖🤖🤖");
    status_m=true;
}

function gotResult(error, results){
    if(error){
        console.log("ERROR ERROR 🤖🤖🤖"+error);
    }
    else{
        console.log("SUCCESS SUCCESS 🤖🤖🤖");
        console.log(results);
        objects=results;
    }
}


function draw(){
    image(cam , 0, 0, 380, 380);
    if (status_m != ""){
        a.detect(cam, gotResult);
        for (i=0;i<objects.length;i++){
            fill("red");
            percent = floor(objects[i].confidence*100)
            if (objects[i].label=="person"){
                document.getElementById("status").innerHTML ="Baby Detected";
                text(objects[i].label + " " + percent + "%" ,objects[i].x+15,objects[i].y+15);
                noFill();
                stroke("red");
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            }
            else{
                soundplay()
                document.getElementById("status").innerHTML ="NO BABY";
            }
        }
    }
}