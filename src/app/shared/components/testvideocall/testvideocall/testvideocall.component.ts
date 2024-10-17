import { Schedule } from './../../../../modelDTO/schedule';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import Peer from 'peerjs';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import { VideoCallService } from 'src/app/service/video_call/video-call.service';

@Component({
  selector: 'app-testvideocall',
  templateUrl: './testvideocall.component.html',
  styleUrls: ['./testvideocall.component.css']
})
export class TestvideocallComponent {
  private peer: Peer;
  roles:string="";
  schedule:Schedule[]=[];
  // peerIdShare: string | undefined;
  peerId = '';
  private lazyStream: any;
  currentPeer: any;
  private peerList: Array<any> = [];

  peerIdShare = '';

  ngOnInit(): void {

  this.getPeerId();
  console.log(this.schedule[0].id +"aaaaaa");
  this.videocall.getCodeVideoCall(this.schedule[0].id).subscribe(next=>{
    console.log("hahaahah");
    this.schedule[0] = next;
    console.log(next);
    if(this.schedule[0].codeVideoCall){
      this.peerIdShare = this.schedule[0].codeVideoCall;
    }
    else{
      this.toart.error("Load lại trang để nhận được mã cuộc gọi");
    }
    console.log("lấy mã thành công");

  },erorr =>{
    console.log("lấy mã thất bại");

  })
  // this.toggleVideoDirection();

}
constructor(private router:Router,private userAuthService:UserAuthService,
  private activatedRoute:ActivatedRoute,
  private videocall:VideoCallService,
  private toart:ToastrService) {
    this.roles=this.getRoles();
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);

      const scheduleData: Schedule = JSON.parse(params['schedule'] || '{}');

      console.log(scheduleData);

  if (typeof scheduleData === 'string') {
  // Handle the case when 'scheduleValue' is a string
  } else {
    if (scheduleData !== null) {
      this.schedule[0] = scheduleData as Schedule;
    }
  }
  console.log("????");

    console.log(this.schedule[0]);

      // if(this.roles!=null){
        // this.patientService.getDoctorBySpecialistIdNoAuthen(idSpecialist).subscribe(next=>{
        //     this.doctor = next;
        //     console.log(next);
        //     console.log(this.doctor);

        // })
      // }
    })
  this.peer = new Peer();
}
getRoles(){
  const username:any = this.userAuthService.getRoles();
  console.log(username);

  let arr = [];
  arr.push(username)
  if(username != null && username){
    for(let i=0;i<arr.length;i++){
      return  arr[i].name;
  }
}
}

private getPeerId = () => {
  //Generate unique Peer Id for establishing connection
  this.peer.on('open', (id) => {
    this.peerId = id;
    // this.createURLToConnect(id);
  });
  this.peer.on('call', (call) => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.lazyStream = stream;
        const localVideo = document.getElementById(
          'local-video'
        ) as HTMLVideoElement;

        if (localVideo) {
          localVideo.srcObject = stream;
          this.streamRemoteVideo(stream);
        } else {
          console.error("Element with id 'local-video' not found");
        }
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          const remoteVideo = document.getElementById(
            'remote-video'
          ) as HTMLVideoElement;
          if (remoteVideo) {
            remoteVideo.srcObject = remoteStream;
          } else {
            console.error("Element with id 'remote-video' not found");
          }
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });
      })
      .catch((err) => {
        console.log(err + 'Unable to get media');
      });
  });
};
connectWithPeer(): void {
  this.callPeer(this.peerIdShare);
}
private callPeer(id: string): void {
  console.log(id);

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      this.lazyStream = stream;
      const localVideo = document.getElementById(
        'local-video'
      ) as HTMLVideoElement;
      if (localVideo) {
        localVideo.srcObject = stream;
      } else {
        console.error("Element with id 'local-video' not found");
      }
      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) => {
        const remoteVideo = document.getElementById(
          'remote-video'
        ) as HTMLVideoElement;
        if (remoteVideo) {
          remoteVideo.srcObject = remoteStream;
        } else {
          console.error("Element with id 'remote-video' not found");
        }
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
        }
      });
    })
    .catch((err) => {
      console.log(err + 'Unable to connect');
    });
}
private streamRemoteVideo(stream: any) {
  const video = document.getElementById('video') as HTMLVideoElement;
  const remoteVideoElement = document.getElementById('remote-video');

  if (video && remoteVideoElement && stream instanceof MediaStream) {
    video.classList.add('video');
    video.srcObject = stream;
    video.play();

    remoteVideoElement.append(video);
  } else {
    if (!video) {
      console.error("Element with id 'video' not found");
    }
    if (!remoteVideoElement) {
      console.error("Element with id 'remote-video' not found");
    }
    if (!(stream instanceof MediaStream)) {
      console.error('Stream is not a valid MediaStream');
    }
  }
}

screenShare(): void {
  this.shareScreen();
}
private shareScreen() {
  // @ts-ignore
  navigator.mediaDevices
    .getDisplayMedia({
      video: {
        // cursor: 'always'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })
    .then((stream) => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      };

      const sender = this.currentPeer
        .getSenders()
        .find((s: any) => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    })
    .catch((err) => {
      console.log('Unable to get display media ' + err);
    });
}

private stopScreenShare() {
  const videoTrack = this.lazyStream.getVideoTracks()[0];
  const sender = this.currentPeer
    .getSenders()
    .find((s: any) => s.track.kind === videoTrack.kind);
  sender.replaceTrack(videoTrack);
}
// switchVideo():void{
//   this.toggleVideo(this.lazyStream);
// }
toggleVideo(): void {
  if (this.lazyStream && this.lazyStream instanceof MediaStream) {
    const videoTracks = this.lazyStream.getVideoTracks();
    if (videoTracks.length > 0) {
      videoTracks.forEach((track) => {
        // Nếu track đang được bật, tắt nó và ngược lại
        track.enabled = !track.enabled;
      });
    } else {
      console.error('No video tracks found in the stream');
    }
  } else {
    console.error('Stream is not a valid MediaStream');
  }
}
endCall(): void {
  // this.router.navigate(['video'])

  // Dừng tất cả các track trong stream
  if (this.lazyStream && this.lazyStream instanceof MediaStream) {
    this.lazyStream.getTracks().forEach((track) => {
      track.stop();

    });
  }

  // Đóng kết nối Peer
  if (this.peer) {
    this.peer.destroy();
  }



}
toggleVideoDirection(): void {
  const myVideo = document.getElementById('local-video') as HTMLVideoElement;
  const remoteVideo = document.getElementById('video') as HTMLVideoElement;
  if (myVideo && remoteVideo) {
    myVideo.style.transform = 'rotateY(180deg)';
    remoteVideo.style.transform = 'rotateY(180deg)';
  } else {
    console.error('Không tìm thấy video element');
  }
}
toggleMicrophone(): void {
  if (this.lazyStream && this.lazyStream instanceof MediaStream) {
    const audioTracks = this.lazyStream.getAudioTracks();
    if (audioTracks.length > 0) {
      audioTracks.forEach((track) => {
        // Bật/tắt microphone
        track.enabled = !track.enabled;
      });
    } else {
      console.error('Không tìm thấy audio tracks trong stream');
    }
  } else {
    console.error('Stream không phải là MediaStream hợp lệ');
  }
}

// chuyển peerId cho Patients
callPatients(){
  console.log("hehe");
  if(this.peerId!=''){
    console.log("haha");

    this.schedule[0].codeVideoCall = this.peerId;
    this.videocall.pushCodeVideoCall(this.schedule[0]).subscribe(next=>{
      this.toart.success("Gửi mã thành công");

    },erorr =>{
       this.toart.success("Gửi mã thất bại");

    })
  }

}
}
