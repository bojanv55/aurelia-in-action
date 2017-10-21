export class Photo {

  attached(){
    this.context = canvas.getContext('2d');


  }

  detached(){
    this.stopCamera();
  }

  stopCamera() {
    if (this.player.srcObject) {
      this.player.srcObject.getVideoTracks().forEach(track => track.stop());
      this.player.srcObject = null;
    }
  }

  loadPhoto(){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let image = new Image();
      image.onload = () => {
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      };
      image.src = e.target.result;
    };
    fileReader.readAsDataURL(this.file.files[0]);
  }

  startCamera(){
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {

        this.player.srcObject = stream;

      })
      .catch(function (e) { console.log(e.name + ": " + e.message); }); //not allowed or error
  }

  capture() {
    this.context.drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height);

    //stop and remove stream from gui
    this.stopCamera();
  }

  // attached(){
  //   this.context = this.canvas.getContext('2d');
  //
  //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     // Not adding `{ audio: true }` since we only want video now
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  //       this.video.src = window.URL.createObjectURL(stream);
  //       this.video.play();
  //     });
  //   }
  // }
  //
  // snap(){
  //   this.context.drawImage(this.video, 0, 0, 640, 480);
  // }
}
