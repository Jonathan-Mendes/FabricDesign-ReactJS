import { firebaseFirestore } from '../utils/firebaseUtils';

class FirebaseService {
	async getDesenhos() {
		let desenhos = [];
		let db = firebaseFirestore.collection('desenhos');
		await db.get().then(querySnapshot => {
			querySnapshot.docs.map(doc => {
				desenhos.push({ ...doc.data() })
			})
		})
		return desenhos;
	}

	async getDesenho(id) {
		let desenho = {
			id: '',
			nomeTecido: '',
			nomeDesenho: '',
			DO: '',
			categoria: '',
			zona1: '',
			zona2: '',
			zona3: '',
			pre1: '',
			pre2: '',
			pre3: '',
			pre4: '',
			photo: ''
		}
		let db = firebaseFirestore.collection('desenhos').doc(id);
		await db.get().then(function (doc) {
			desenho.id = doc.data().id;
			desenho.nomeTecido = doc.data().nomeTecido;
			desenho.nomeDesenho = doc.data().nomeDesenho;
			desenho.DO = doc.data().DO;
			desenho.categoria = doc.data().categoria;
			desenho.zona1 = doc.data().zona1;
			desenho.zona2 = doc.data().zona2;
			desenho.zona3 = doc.data().zona3;
			desenho.pre1 = doc.data().pre1;
			desenho.pre2 = doc.data().pre2;
			desenho.pre3 = doc.data().pre3;
			desenho.pre4 = doc.data().pre4;
			desenho.photo = doc.data().photo;
		});
		return desenho;
	}

	async createDesenho(nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
		try {
			await firebaseFirestore.collection('desenhos').add({
			}).then(function (docRef) {
				firebaseFirestore.collection('desenhos').doc(docRef.id).set({
					id: docRef.id,
					nomeTecido,
					nomeDesenho,
					DO,
					categoria,
					zona1,
					zona2,
					zona3,
					pre1,
					pre2,
					pre3,
					pre4,
					photo: 'https://firebasestorage.googleapis.com/v0/b/fabric-design-145ac.appspot.com/o/default.jpg?alt=media&token=639a3bc4-4af8-473b-8e6e-c324b8d129ef'
				})
			}).catch(function (error) {
				console.error("Error adding document: ", error);
				return error;
			});
			return true;
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	async updateDesenho(id, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
		try {
			await firebaseFirestore.collection('desenhos').doc(id).set({
				id,
				nomeTecido,
				nomeDesenho,
				DO,
				categoria,
				zona1,
				zona2,
				zona3,
				pre1,
				pre2,
				pre3,
				pre4
			})
			return true
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	async deleteDesenho(id) {
		try {
			firebaseFirestore.collection('desenhos').doc(id).delete();
			return true;
		} catch (error) {
			return error;
		}
	}

	// async updateDesenhoPhoto(imagem, id, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
	// 	const uploadTask = firebaseApp.storage()
	// 		.ref('photo').child(nomeTecido + '-' + nomeDesenho + '/' + imagem.name).put(imagem);

	// 	try {
	// 		await uploadTask.on(firebaseApp.storage.TaskEvent.STATE_CHANGED,
	// 			function (snapshot) {
	// 				switch (snapshot.state) {
	// 					case firebaseApp.storage.TaskState.PAUSED:
	// 						break;
	// 					case firebaseApp.storage.TaskState.RUNNING:
	// 						break;
	// 				}
	// 			}, function (error) {
	// 				switch (error.code) {
	// 					case 'storage/unauthorized':
	// 						return false;
	// 					case 'storage/canceled':
	// 						return false;
	// 					case 'storage/unknown':
	// 						return false;
	// 				}
	// 			}, function() {
	// 				let photoRef = firebaseApp.storage().ref('photo').child(nomeTecido + '-' + nomeDesenho + '/' + imagem.name);
	// 				photoRef.getDownloadURL().then(function (url) {
	// 					firebaseFirestore.collection('desenhos').doc(id).set({
	// 						id,
	// 						nomeTecido,
	// 						nomeDesenho,
	// 						DO,
	// 						categoria,
	// 						zona1,
	// 						zona2,
	// 						zona3,
	// 						pre1,
	// 						pre2,
	// 						pre3,
	// 						pre4,
	// 						photo: url
	// 					}).catch(function (error) {
	// 						return false;
	// 					});
	// 				}).catch(function (error) {
	// 					console.log(error)
	// 					switch (error.code) {
	// 						case 'storage/object-not-found':
	// 							break;
	// 						case 'storage/unauthorized':
	// 							break;
	// 						case 'storage/canceled':
	// 							break;
	// 						case 'storage/unknown':
	// 							break;
	// 					}
	// 				});
	// 			});
	// 		return true
	// 	} catch (error) {
	// 		return false;
	// 	}
	// }

	// async createDesenhoImagem(imagem, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4) {
	// 	const uploadTask = firebaseApp.storage()
	// 		.ref('photo').child(nomeTecido + '-' + nomeDesenho + '/' + imagem.name).put(imagem);

	// 	try {
	// 		await uploadTask.on(firebaseApp.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	// 			function (snapshot) {
	// 				switch (snapshot.state) {
	// 					case firebaseApp.storage.TaskState.PAUSED: // or 'paused'
	// 						break;
	// 					case firebaseApp.storage.TaskState.RUNNING: // or 'running'
	// 						break;
	// 				}
	// 			}, function (error) {
	// 				switch (error.code) {
	// 					case 'storage/unauthorized':
	// 						// User doesn't have permission to access the object
	// 						return false;
	// 					case 'storage/canceled':
	// 						// User canceled the upload
	// 						return false;
	// 					case 'storage/unknown':
	// 						// Unknown error occurred, inspect error.serverResponse
	// 						return false;
	// 				}
	// 			},function () {
	// 				let photoRef = firebaseApp.storage().ref('photo').child(nomeTecido + '-' + nomeDesenho + '/' + imagem.name);
	// 				photoRef.getDownloadURL().then(function (url) {
	// 					firebaseFirestore.collection('desenhos').add({
	// 					}).then(function (docRef) {
	// 						firebaseFirestore.collection('desenhos').doc(docRef.id).set({
	// 							id: docRef.id,
	// 							nomeTecido,
	// 							nomeDesenho,
	// 							DO,
	// 							categoria,
	// 							zona1,
	// 							zona2,
	// 							zona3,
	// 							pre1,
	// 							pre2,
	// 							pre3,
	// 							pre4,
	// 							photo: url
	// 						}).catch(function (error) {
	// 							return false;
	// 						});
	// 						return true
	// 					}).catch(function (error) {
	// 						switch (error.code) {
	// 							case 'storage/object-not-found':
	// 								break;
	// 							case 'storage/unauthorized':
	// 								break;
	// 							case 'storage/canceled':
	// 								break;
	// 							case 'storage/unknown':
	// 								break;
	// 						}
	// 						return false;
	// 					});
	// 				});
	// 			}
	// 		)
	// 		return true;
	// 	} catch (error) {
	// 		return false;
	// 	}
	// }
}

export default new FirebaseService();