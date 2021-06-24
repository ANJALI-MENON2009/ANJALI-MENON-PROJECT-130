song1 = "" ;
song2 = "" ;
song3 = "" ;

rightWristX = 0 ;
leftWristX = 0 ;
rightWristy = 0 ;
leftWristY = 0 ;
scoreRightWrist = 0 ;
scoreLeftWrist = 0 ;
song1_status = "" ;
song2_status = "" ;
song3_status = "" ;
leftElbowX = 0 ;
leftElbowY = 0 ;
scoreLeftElbow = 0 ;

function preload() {
  song1 = loadSound("peter_pan.mp3") ;
  song2 = loadSound("Hakuna-Matata.mp3") ;
  song3 = loadSound("frozen.mp3") ;
}

function setup() {
  canvas = createCanvas(550, 500) ;
  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, modelLoaded) ;
  posenet.on('pose', gotResult) ;
}
function draw() {
  image(video, 0, 0, 550, 500) ;
  song1_status = song1.isPlaying() ;
  song2_status = song2.isPlaying() ;
  song3_status = song3.isPlaying() ;

  if(scoreRightWrist>0.2) {
  console.log("Right wrist score = " + scoreRightWrist) ;
  fill("#FF0000");
	stroke("#FF0000");
  circle(rightWristX, rightWristY, 20) ;
  song2.stop() ;
  song3.stop() ;
  if(song1_status == false) {
    song1.play() ;
    document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song"
  }
  }
  if(scoreLeftWrist>0.2) {
    console.log("Left wrist score = " + scoreLeftWrist) ;
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY, 20) ;
    song1.stop() ;
    song3.stop() ;
    if(song2_status == false) {
      song2.play() ;
      document.getElementById("song").innerHTML = "Playing - Hakuna Matata"
    }
    }
    if(scoreLeftElbow>0.2) {
      console.log("Left elbow score = " + scoreLeftElbow) ;
      fill("#FF0000");
      stroke("#FF0000");
      circle(rightWristX, rightWristY, 20) ;
      song1.stop() ;
      song2.stop() ;
      if(song3_status == false) {
        song3.play() ;
        document.getElementById("song").innerHTML = "Playing - Let It Go"
      }
      }
}

function modelLoaded() {
  console.log("p5 model is ready to use...") ;
}
function gotResult(results) {
  // console.log(results) ;
  scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	scoreLeftElbow =  results[0].pose.keypoints[7].score;
  // console.log("Left elbow score = " + scoreLeftElbow) ;
  // console.log("Right wrist score = " + scoreRightWrist) ;
  rightWristX = results[0].pose.rightWrist.x ;
  // console.log("Right wrist x = " + rightWristX) ;
  rightWristY = results[0].pose.rightWrist.y ;
  // console.log("Right wrist y = " + rightWristY) ;
  // console.log("Left wrist score = " + scoreLeftWrist) ;
  leftWristX = results[0].pose.leftWrist.x ;
  // console.log("Left wrist x = " + leftWristX) ;
  leftWristY = results[0].pose.leftWrist.y ;
  // console.log("Left wrist y = " + leftWristY) ;
  leftElbowX = results[0].pose.leftElbow.x ;
  // console.log("Left elbow x = " + leftElbowX) ;
  leftElbowY = results[0].pose.leftElbow.y ;
  // console.log("Left elbow y = " + leftElbowY) ;
}



