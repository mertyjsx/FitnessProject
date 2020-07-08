import React from 'react'
import Modal from '../modal/Modal'
import { Button } from 'semantic-ui-react'

class InteractionCall extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			isCaller: false,
			open: false,
			state: '',
			io: false
		};
		this.io = false
		this.peerConnections = []

		this.answerCall = this.answerCall.bind(this)
		this.dropCall = this.dropCall.bind(this)
	}

	answerCall () {
		let io = this.io;
		let iid = this.props.iid;
		let $this = this
		if (!io) return

		io.emit("publish",{
			"room": "user-"+this.props.auth.uid,
			"event": "callanswer",
			"data": {

			}
		})
		this.setState({ state: 'callactive' })
	}

	dropCall () {
		let io = this.io;
		let iid = this.props.iid;
		if (!io) return

		io.emit("publish", {
			"room":iid,
			"event":"dropcall",
			"data":{

			}
		})
		this.setState({ state: 'callended'})
		window.location.reload() // The RTC connections aren't reset after the call, so I just reload the page
	}

	closeModal () {
		this.setState({ open: false })
	}

	statusContent () {
		switch(this.state.state) {
			case 'callpending':
				return "Calling..."
			case 'callincoming':
				return (<Button className={"link"} onClick={this.answerCall}>Answer Video Call</Button>)
			case 'callactive':
				return (<Button className={"link"} onClick={this.dropCall}>End Video Call</Button>)
			case 'callended':
				return (<Button className={"link"} onClick={this.closeModal}>Close</Button>)
		}
	}

	modalContent ()  {
		return (
			<div className="row" style={{padding:'15px'}}>
				<div className="col col--6">
					<video style={{width:'100%',height:'auto',background:'#000'}} id="call-user-video" playsInline='true' autoPlay>
						<p>Video is not supported, please update your browser.</p>
					</video>
				</div>
				<div className="col col--6">
					<video style={{width:'100%',height:'auto',background:'#000'}} id="current-user-video" playsInline='true' autoPlay>
						<p>Video is not supported, please update your browser.</p>
					</video>
				</div>
				<div className="call-status">
					{this.statusContent()}
				</div>
			</div>
			)
	}

	render () {
		let targetuid = this.props.interaction.proUID
		if (targetuid == this.props.auth.uid) { targetuid = this.props.interaction.userUID }
		let $this = this;
		let iid = this.props.iid;
		let io = require('socket.io-client')('https://192.168.254.100:5000');
		this.io = io
		this.queuedCandidates = []
		this.localstream = []
		let peerConfig = {
					// sdpSemantics: 'unified-plan',
					iceServers: [
				      {
				        urls: ["stun:stun1.l.google.com:19302"],
				      }
				    ],
				    // iceTransportPolicy: 'relay'
				    // iceCandidatePoolSize: 10,
				};
		io.on('connect', ()=>{
			io.emit("subscribe", { "room": iid })
			io.emit("subscribe", { "room": "user-" + targetuid })
			// this.setState({ io: io })
		})
		io.on('connect_error', (err)=>{
			console.log(err)
		})
		io.on("call", ()=>{
			if (this.state.state != 'callincoming') {
				console.log("Incoming call")
				this.setState({ open: true, state:'callincoming' })
				console.log(this.state)
				document.querySelector(".interaction-call--component .modal").className = "modal modal--active"
			}
		})
		io.on("callanswer", ()=>{
			if (!this.peerConnections[this.props.auth.uid]) {
				this.peerConnections[this.props.auth.uid] = new RTCPeerConnection(peerConfig)
				this.peerConnections[targetuid] = new RTCPeerConnection(peerConfig)
				this.peerConnections[this.props.auth.uid].icegatheringstatechange = event =>{
					console.log("Ice Gathering changed", event)
				}
				let video = document.getElementById("current-user-video")
					navigator.mediaDevices.getUserMedia({
						video: { facingMode: 'user' },
						audio: true // set to true
					}).then(stream=>{
						$this.localstream.push(stream);
						video.srcObject = stream
						video.srcObject.getTracks().forEach(track=>{
							console.log(track)
							let RTPSender = $this.peerConnections[$this.props.auth.uid].addTrack(track, stream)
							console.log(RTPSender)
							// $this.peerConnections[$this.props.auth.uid].addTrack(track, stream)
						})
						$this.peerConnections[$this.props.auth.uid].createOffer({
							iceRestart: true,
							// offerToReceiveAudio: true,
							// offerToReceiveVideo: true,
						})
							.then(sdp=>{
								console.log(sdp)
								$this.peerConnections[$this.props.auth.uid].setLocalDescription(sdp)
									.then(()=>{
										$this.peerConnections[$this.props.auth.uid].onicecandidate = event=>{
											// console.log(event, $this.props.auth.uid, $this.peerConnections[$this.props.auth.uid])
											io.emit("publish",{
												room: "user-" + $this.props.auth.uid,
												event: "candidate",
												data: [
													$this.props.auth.uid,
													event.candidate
												]
											})
										}
										$this.peerConnections[$this.props.auth.uid].ontrack = event => {
											console.log(event)
										    document.getElementById('call-user-video').srcObject = event.streams[0];
										};
										$this.peerConnections[targetuid].ontrack = event => {
											console.log(event)
										    document.getElementById('call-user-video').srcObject = event.streams[0];
										};
									})
									.then(()=>{
										io.emit("publish", {
											room: "user-" + $this.props.auth.uid,
											event: "offer",
											data: [
												$this.props.auth.uid,
												$this.peerConnections[$this.props.auth.uid].localDescription
											]
										})
										$this.peerConnections[targetuid].setRemoteDescription($this.peerConnections[$this.props.auth.uid].localDescription)
										console.log($this.props.auth.uid, $this.peerConnections[$this.props.auth.uid])
									})
							})
					})
			}
		})
		io.on("candidate", (data)=>{
			let candidate = data[1]
			let uid = data[0]
			if (this.peerConnections[uid]  && candidate) {
				if (this.peerConnections[uid].remoteDescription) {
					this.peerConnections[uid].addIceCandidate(new RTCIceCandidate(candidate))
				} else {
					this.queuedCandidates.push({ 'uid': uid, 'candidate': candidate})
				}
				// console.log("ICE Candidate received", this.peerConnections[uid])
			}
		})
		io.on("offer", data=>{
			let uid = data[0]
			let description = data[1]
			console.log("offer event", data)
			if (!this.peerConnections[uid])
				this.peerConnections[uid] = new RTCPeerConnection(peerConfig)
			// this.setState({ state: 'callincoming' })
			if (!this.peerConnections[uid].remoteDescription) {
				// $this.peerConnections[$this.props.auth.uid] = new RTCPeerConnection(peerConfig)
				this.peerConnections[uid].icegatheringstatechange = event =>{
					console.log("Ice Gathering changed", event)
				}
				// if (!this.peerConnections[uid].remoteDescription) {
				setTimeout(function () {
					navigator.mediaDevices.getUserMedia({
						video: { facingMode:'user' },
						audio: true,
					}).then(stream=>{
						$this.localstream.push(stream);
						document.getElementById('current-user-video').srcObject = stream
						stream.getTracks().forEach(track=>{
							let Sender = $this.peerConnections[uid].addTrack(track, stream)
							console.log(Sender)
						})
						$this.peerConnections[uid].setRemoteDescription(description)
							.then(()=>$this.peerConnections[uid].createAnswer())
							.then(sdp=>{ 
								// $this.peerConnections[$this.props.auth.uid].setRemoteDescription(sdp)
								$this.peerConnections[uid].setLocalDescription(sdp) 
							})
							.then(()=>{
								$this.peerConnections[uid].onicecandidate = event=>{
									// console.log(event, uid, $this.peerConnections[uid])
									io.emit("publish",{
										room: "user-" + $this.props.auth.uid,
										event: "candidate",
										data: [
											uid,
											event.candidate
										]
									})
								}
								$this.peerConnections[uid].ontrack = event => {
									console.log(event)
								    document.getElementById('call-user-video').srcObject = event.streams[0];
								};
								// $this.peerConnections[$this.props.auth.uid].setLocalDescription($this.peerConnections[uid].localDescription)
								$this.queuedCandidates.forEach(data=>{
									if (uid == data.uid) {
										$this.peerConnections[uid].addIceCandidate(new RTCIceCandidate(data.candidate))
									}
								})
								io.emit("publish", {
									room: "user-" + $this.props.auth.uid,
									event: "answer",
									data:[
										uid,
										$this.peerConnections[uid].localDescription
									]
								})
							})
						console.log(uid, $this.peerConnections[uid])
					})
				},1000)
				// }
			}

			console.log("Test", this.state.isCaller) 
				if (!this.state.isCaller) {
					if (!this.peerConnections[this.props.auth.uid])
						this.peerConnections[this.props.auth.uid] = new RTCPeerConnection(peerConfig)

					let video = document.getElementById('current-user-video')
					let stream = video.srcObject
					if (stream) {
						stream.getTracks.forEach(track=>{
							$this.peerConnections[$this.props.auth.uid].addTrack(track, stream)
						})
					} else {
						navigator.mediaDevices.getUserMedia({
							video: { facingMode: 'user' },
							audio: true,
						}).then(stream=>{
							$this.localstream.push(stream);
							video.srcObject = stream
							stream.getTracks().forEach(track=>{
								$this.peerConnections[$this.props.auth.uid].addTrack(track, stream)
							})
						})
					}

					setTimeout(()=>{
					this.peerConnections[this.props.auth.uid].createOffer({
						iceRestart:true
					})
						.then(sdp=>{
							$this.peerConnections[$this.props.auth.uid].setLocalDescription(sdp)
								.then(()=>{
										$this.peerConnections[$this.props.auth.uid].onicecandidate = event=>{
											// console.log(event, $this.props.auth.uid, $this.peerConnections[$this.props.auth.uid])
											io.emit("publish",{
												room: "user-" + $this.props.auth.uid,
												event: "candidate",
												data: [
													$this.props.auth.uid,
													event.candidate
												]
											})
										}
										$this.peerConnections[$this.props.auth.uid].ontrack = event => {
											console.log(event)
										    document.getElementById('call-user-video').srcObject = event.streams[0];
										};
										$this.peerConnections[targetuid].ontrack = event => {
											console.log(event)
										    document.getElementById('call-user-video').srcObject = event.streams[0];
										};
									})
									.then(()=>{
										io.emit("publish",{
											room:"user-" + $this.props.auth.uid,
											event:"offer",
											data:[$this.props.auth.uid, $this.peerConnections[$this.props.auth.uid].localDescription]
										})
									})
								})
					},1000)
				}
		})
		io.on("answer", data=>{
			let uid = data[0]
			let description = data[1]
			console.log("answer event", data)
			if(!this.peerConnections[uid].remoteDescription) {
				this.peerConnections[uid].setRemoteDescription(description)
					.then(()=>{
						// $this.peerConnections[targetuid].setLocalDescription($this.peerConnections[$this.props.auth.uid].remoteDescription)
						$this.queuedCandidates.forEach(data=>{
							if (uid == data.uid) {
								this.peerConnections[uid].addIceCandidate(new RTCIceCandidate(data.candidate))
							}
						})
						$this.setState({ state: 'callactive' })
					})
				console.log(uid, this.peerConnections[uid])
			}
		})
		io.on("dropcall", ()=>{
			for(let key in this.peerConnections) {
				this.peerConnections[key].close()
			}
			this.setState({ open: false, state: '' })
			if (document.getElementById('current-user-video').srcObject) {
				document.getElementById('current-user-video').srcObject.getTracks().forEach(track=>{
					track.stop()
				})
			}
			if (document.getElementById('call-user-video').srcObject) {
				document.getElementById('call-user-video').srcObject.getTracks().forEach(track=>{
					track.stop()
				})	
			}
			if (this.localstream.length) {
				this.localstream.forEach(stream=>{
					stream.getTracks().forEach(track=>track.stop())
				})
			} 
			document.querySelector(".interaction-call--component .modal").className = "modal"
		})
	
		let createCall = () => {
			setTimeout(function () {
				io.emit("publish", {
					"room":"user-" + $this.props.auth.uid,
					"event":"call",
					"data":{

					}
				})
				
				$this.setState({ isCaller: true, state: 'callpending' })
			},1000)
		}

		return (
			<div className="interaction-call--component">
				<div className="text--center">
					<Modal buttonStyle={"link"} buttonText={"Start Video Call"}
							isOpen={this.state.open}
							content={this.modalContent()}
							openEvent={createCall}
							closeEvent={this.dropCall}></Modal>
				</div>
			</div>);
	}
};

export default InteractionCall;